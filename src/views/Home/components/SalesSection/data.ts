import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade Cryptocurrency.',
  bodyText: 'Connect your wallet and swap your tokens at lightning speed without ever losing control of your tokens.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: 'https://dex.solidaritytoken.io/whitepaper.pdf',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: 'BNB token' },
      { src: 'BTC', alt: 'BTC token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income.',
  bodyText: 'Work smart, not hard. Let your cryptocurrency work for you and earn passive income everyday.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.thecryptospot.org/',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: 'Pie chart' },
      { src: 'stonks', alt: 'Stocks chart' },
      { src: 'folder', alt: 'Folder with cake token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'SDT fuels the universe.',
  bodyText:
    'Revolutionizing blockchain one block at a time. SDT token is the driving force behind The Crypto Spot and its ecosystem. Earn, trade, and store crypto in The Crypto Spot!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0xC58322eb9554e7927C1d08D93FC3aBdB0D3EdAb0',
    text: 'Buy SDT',
    external: false,
  },
  secondaryButton: {
    to: 'https://dex.solidaritytoken.io/',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d pancake' },
      { src: 'top-right', alt: 'Small 3d pancake' },
      { src: 'top-left', alt: 'Small 3d pancake' },
    ],
  },
}
