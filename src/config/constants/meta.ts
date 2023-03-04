import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'SolidarityFinance',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('SolidarityFinance')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('SolidarityFinance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('SolidarityFinance')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('SolidarityFinance')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('SolidarityFinance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('SolidarityFinance')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('SolidarityFinance')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('SolidarityFinance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('SolidarityFinance')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('SolidarityFinance')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('SolidarityFinance')}`,
      }
    default:
      return null
  }
}
