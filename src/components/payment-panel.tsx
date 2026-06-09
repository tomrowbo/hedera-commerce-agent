import type { ChatEvent } from '@/lib/types';
import { PaymentCard } from './payment-card';

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
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-200">
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
