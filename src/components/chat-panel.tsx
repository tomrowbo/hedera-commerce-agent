'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatEvent } from '@/lib/types';

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-2xl">
      <div className="w-7 h-7 rounded-full bg-hedera/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs font-bold text-hedera">H</span>
      </div>
      <div className="bg-hedera/5 border border-hedera/10 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-hedera/60 animate-pulse-dot" />
          <span className="w-2 h-2 rounded-full bg-hedera/60 animate-pulse-dot-delay-1" />
          <span className="w-2 h-2 rounded-full bg-hedera/60 animate-pulse-dot-delay-2" />
        </div>
      </div>
    </div>
  );
}

export function ChatPanel({ events, loading }: { events: ChatEvent[]; loading: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events, loading]);

  // Filter out raw data events — the agent's answer already includes the formatted data
  const chatEvents = events.filter(
    (e) => e.type === 'thinking' || e.type === 'answer' || e.type === 'payment',
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
      {chatEvents.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-hedera/10 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-hedera">H</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Hedera Commerce Agent</h2>
          <p className="text-sm text-gray-400 max-w-sm">
            Ask me to fetch paid API data. I will automatically handle MPP payments on Hedera.
          </p>
        </div>
      )}

      {chatEvents.map((event, i) => {
        if (event.type === 'thinking') {
          const isUser = event.text.startsWith('You: ');
          if (isUser) {
            return (
              <div key={i} className="flex justify-end">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                  <p className="text-sm leading-relaxed">{event.text.replace(/^You: /, '')}</p>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex items-start gap-3 max-w-2xl">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">...</span>
              </div>
              <div className="text-sm text-gray-400 italic py-2">{event.text}</div>
            </div>
          );
        }

        if (event.type === 'answer') {
          return (
            <div key={i} className="flex items-start gap-3 max-w-2xl">
              <div className="w-7 h-7 rounded-full bg-hedera/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-hedera">H</span>
              </div>
              <div className="bg-hedera/5 border border-hedera/10 rounded-2xl rounded-tl-sm px-4 py-3 flex-1 prose prose-sm prose-gray max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="text-sm leading-relaxed text-gray-800 mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    ul: ({ children }) => <ul className="text-sm text-gray-800 space-y-1 my-1">{children}</ul>,
                    li: ({ children }) => <li className="text-sm text-gray-800">{children}</li>,
                    h1: ({ children }) => <h3 className="text-base font-semibold text-gray-900 mb-1">{children}</h3>,
                    h2: ({ children }) => <h3 className="text-base font-semibold text-gray-900 mb-1">{children}</h3>,
                    h3: ({ children }) => <h4 className="text-sm font-semibold text-gray-900 mb-1">{children}</h4>,
                  }}
                >
                  {event.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        }

        if (event.type === 'payment') {
          return (
            <div key={i} className="flex items-start gap-3 max-w-2xl">
              <div className="w-7 h-7 flex-shrink-0" />
              <div className="flex items-center gap-2 text-xs text-hedera font-medium bg-hedera/5 rounded-full px-3 py-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Paid ${event.amount} {event.currency} via MPP
                {event.hashscanUrl && (
                  <a href={event.hashscanUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-hedera-dark">
                    Hashscan
                  </a>
                )}
              </div>
            </div>
          );
        }

        return null;
      })}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
