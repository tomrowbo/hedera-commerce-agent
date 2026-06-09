'use client';

import { useState } from 'react';

export function MessageInput({ onSend, disabled }: { onSend: (message: string) => void; disabled: boolean }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white px-6 py-4"
    >
      <div className="flex items-center gap-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the agent to fetch paid data..."
            disabled={disabled}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hedera/30 focus:border-hedera disabled:opacity-50 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="rounded-xl bg-hedera px-5 py-3 text-sm font-semibold text-white hover:bg-hedera-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>Send</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
