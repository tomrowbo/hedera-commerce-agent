'use client';

import { useState, useEffect } from 'react';
import type { ChatEvent } from '@/lib/types';
import { PaymentCard } from './payment-card';

interface WalletInfo {
  accountId: string;
  network: string;
  hbar: string;
  usdc: string;
  usdcFormatted: string;
  hashscanUrl: string;
  error?: string;
}

function WalletCard() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wallet')
      .then((res) => res.json())
      .then((data) => {
        setWallet(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-4 mt-4 rounded-lg border border-purple-200 bg-purple-50/50 p-3 animate-pulse">
        <div className="h-4 w-28 bg-purple-100 rounded mb-2" />
        <div className="h-3 w-20 bg-purple-100 rounded mb-3" />
        <div className="h-3 w-24 bg-purple-100 rounded mb-1" />
        <div className="h-3 w-24 bg-purple-100 rounded" />
      </div>
    );
  }

  if (!wallet) return null;

  return (
    <div className="mx-4 mt-4 rounded-lg border border-purple-200 bg-purple-50/50 p-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs font-semibold text-purple-700">Agent Wallet</span>
      </div>

      {/* Account ID */}
      <p className="text-xs font-mono text-purple-600 mb-2.5 pl-4">
        {wallet.accountId}
      </p>

      {/* Balances */}
      <div className="space-y-1 pl-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-gray-800 font-mono">
            {wallet.hbar}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-gray-800 font-mono">
            {wallet.usdcFormatted} <span className="text-xs font-normal text-gray-500">USDC</span>
          </span>
        </div>
      </div>

      {/* Hashscan link */}
      <a
        href={wallet.hashscanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 pl-4 flex items-center gap-1 text-xs text-purple-500 hover:text-purple-700 transition-colors"
      >
        View on Hashscan
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>

      {wallet.error && (
        <p className="mt-2 pl-4 text-xs text-red-400">Balance fetch error</p>
      )}
    </div>
  );
}

export function PaymentPanel({ events }: { events: ChatEvent[] }) {
  const paymentEvents = events.filter(
    (e) => e.type === 'payment' || e.type === 'session_open' || e.type === 'session_close',
  );

  const totalPaid = paymentEvents
    .filter((e) => e.type === 'payment')
    .reduce((sum, e) => sum + (e.type === 'payment' ? Number(e.amount) : 0), 0);

  const txCount = paymentEvents.filter((e) => e.type === 'payment').length;

  return (
    <div className="w-80 border-l border-gray-200 bg-gray-50/60 flex flex-col">
      {/* Agent Wallet */}
      <WalletCard />

      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-200 mt-4">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-hedera" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>
          Payment Activity
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {paymentEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400">No payments yet</p>
            <p className="text-xs text-gray-300 mt-1">Payments will appear here when the agent calls paid APIs</p>
          </div>
        )}
        {paymentEvents.map((event, i) => (
          <PaymentCard key={i} event={event} />
        ))}
      </div>

      {/* Footer summary */}
      {paymentEvents.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              {txCount} payment{txCount !== 1 ? 's' : ''}
            </span>
            <span className="font-mono font-semibold text-gray-700">
              {totalPaid} USDC
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
