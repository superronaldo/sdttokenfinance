import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      },
   
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Docs'),
        href: 'https://dex.solidaritytoken.io/whitepaper.pdf',
      },
     
      {
        label: t('Facebook'),
        href: 'https://www.facebook.com/solidarityfinance',
      },
      {
        label: t('Instagram'),
        href: 'https://www.instagram.com/Solidaritycommunity1/',
      },
      {
        label: t('Youtube'),
        href: 'https://www.youtube.com/channel/UCI3T14vhPsZj2Nqr-bEBhFw',
      },
      {
        label: t('Twitter'),
        href: 'https://twitter.com/SOLIDARITytoke1',
      },
    ],
  },
]

export default config
