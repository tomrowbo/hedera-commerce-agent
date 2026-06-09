import type { ChatEvent } from '@/lib/types';

export function PaymentCard({ event }: { event: ChatEvent }) {
  if (event.type === 'payment') {
    return (
      <div className="rounded-xl border border-hedera/20 bg-gradient-to-br from-hedera/5 to-transparent p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-hedera/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-hedera" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-hedera">402 Paid</span>
          </div>
          <span className="font-mono text-sm font-semibold text-gray-800">
            ${event.amount} {event.currency}
          </span>
        </div>
        <div className="mt-1.5 text-xs text-gray-400">{event.method}</div>
        {event.hashscanUrl && (
          <a
            href={event.hashscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-hedera hover:text-hedera-dark transition-colors"
          >
            View on Hashscan
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>
    );
  }

  if (event.type === 'session_open') {
    return (
      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-transparent p-3.5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-amber-700">Channel Opened</span>
        </div>
        <div className="font-mono text-sm text-gray-700">Deposit: {event.deposit} USDC</div>
        {event.hashscanUrl && (
          <a
            href={event.hashscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
          >
            View on Hashscan
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>
    );
  }

  if (event.type === 'session_close') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-transparent p-3.5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-emerald-700">Channel Settled</span>
        </div>
        <div className="space-y-1 text-xs text-gray-600 font-mono">
          <div className="flex justify-between">
            <span>Queries</span>
            <span className="text-gray-800 font-semibold">{event.totalQueries}</span>
          </div>
          <div className="flex justify-between">
            <span>On-chain txs</span>
            <span className="text-gray-800 font-semibold">{event.onChainTxs}</span>
          </div>
          <div className="flex justify-between">
            <span>Total paid</span>
            <span className="text-gray-800 font-semibold">{event.totalPaid} USDC</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
