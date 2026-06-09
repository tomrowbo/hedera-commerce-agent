import { Client, AccountId, AccountBalanceQuery } from '@hiero-ledger/sdk';

export async function GET() {
  const ACCOUNT_ID = process.env.HEDERA_ACCOUNT_ID!;
  const NETWORK = process.env.HEDERA_NETWORK ?? 'testnet';
  const USDC_TOKEN = NETWORK === 'testnet' ? '0.0.5449' : '0.0.456858';

  try {
    const client = NETWORK === 'testnet' ? Client.forTestnet() : Client.forMainnet();
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(ACCOUNT_ID))
      .execute(client);

    const hbarBalance = balance.hbars.toString();
    const usdcBalance = balance.tokens?._map?.get(USDC_TOKEN)?.toString() ?? '0';

    client.close();

    return Response.json({
      accountId: ACCOUNT_ID,
      network: NETWORK,
      hbar: hbarBalance,
      usdc: usdcBalance,
      usdcFormatted: (Number(usdcBalance) / 1_000_000).toFixed(2),
      hashscanUrl: `https://hashscan.io/${NETWORK}/account/${ACCOUNT_ID}`,
    });
  } catch (e: any) {
    return Response.json({
      accountId: ACCOUNT_ID,
      network: NETWORK,
      hbar: 'Error',
      usdc: 'Error',
      usdcFormatted: 'Error',
      hashscanUrl: `https://hashscan.io/${NETWORK}/account/${ACCOUNT_ID}`,
      error: e.message,
    });
  }
}
