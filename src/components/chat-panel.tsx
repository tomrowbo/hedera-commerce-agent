'use client';

import { useEffect, useRef } from 'react';
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

  const chatEvents = events.filter(
    (e) => e.type === 'thinking' || e.type === 'answer' || e.type === 'data' || e.type === 'payment',
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
              <div className="bg-hedera/5 border border-hedera/10 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{event.text}</p>
              </div>
            </div>
          );
        }

        if (event.type === 'data') {
          return (
            <div key={i} className="flex items-start gap-3 max-w-2xl">
              <div className="w-7 h-7 flex-shrink-0" />
              <div className="bg-gray-900 text-green-400 rounded-xl px-4 py-3 flex-1 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap">{event.text}</pre>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                402 Paid: {event.amount} {event.currency} via MPP
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
