'use client';

import { useState } from 'react';
import { ChatPanel } from '@/components/chat-panel';
import { PaymentPanel } from '@/components/payment-panel';
import { MessageInput } from '@/components/message-input';
import type { ChatEvent } from '@/lib/types';

export default function Home() {
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string) => {
    setEvents((prev) => [...prev, { type: 'thinking', text: `You: ${message}` }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setEvents((prev) => [...prev, ...data.events]);
    } catch (err) {
      setEvents((prev) => [
        ...prev,
        { type: 'answer' as const, text: 'Error: Failed to get response from agent.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-hedera flex items-center justify-center text-white text-sm font-bold shadow-sm">
            H
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 leading-tight">Hedera Commerce Agent</h1>
            <p className="text-xs text-gray-400 leading-tight">Autonomous payments via MPP</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Testnet
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <ChatPanel events={events} loading={loading} onSuggestion={handleSend} />
        <PaymentPanel events={events} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
