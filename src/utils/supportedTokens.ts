export type Token = { label: string; value: string; icon: string; address?: string };

export const tokens: Token[] = [
  {
    label: 'USDC',
    value: 'USDC',
    icon: '/static/icons/usdc-logo.svg',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },
  {
    label: 'USDT',
    value: 'USDT',
    icon: '/static/icons/tether-usdt-logo.svg',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  {
    label: 'DAI',
    value: 'DAI',
    icon: '/static/icons/multi-collateral-dai-dai-logo.svg',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f'
  },
  {
    label: 'ETH',
    value: 'ETH',
    icon: '/static/icons/ethereum-eth-logo.svg'
  },
  {
    label: 'WBTC',
    value: 'WBTC',
    icon: '/static/icons/wrapped-bitcoin-wbtc-logo.svg',
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  }
];
