import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')
// const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0 && p.sousId !== 1)
const nonMasterPools = poolsConfig.filter((p) => p.sousId > 11)
const masterChefContract = getMasterchefContract()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)
  const { amount: wbnbPoolAmount } = await masterChefContract.userInfo('6', account)
  const { amount: busdPoolAmount } = await masterChefContract.userInfo('7', account)
  const { amount: lytPoolAmount } = await masterChefContract.userInfo('8', account)  

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON(), 1: new BigNumber(wbnbPoolAmount.toString()).toJSON(), 2: new BigNumber(busdPoolAmount.toString()).toJSON(), 3: new BigNumber(lytPoolAmount.toString()).toJSON()}
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Std / Sdt pool
  const pendingReward = await masterChefContract.pendingSdt('0', account)
  const pendingWbnbReward = await masterChefContract.pendingSdt('6', account)
  const pendingBusdReward = await masterChefContract.pendingSdt('7', account)
  const pendingLytReward = await masterChefContract.pendingSdt('8', account)
  // const pendingDaiReward = await masterChefContract.pendingDVM('32', account)
  // const pendingCakeReward = await masterChefContract.pendingDVM('33', account)
  // const pendingLinkReward = await masterChefContract.pendingDVM('34', account)
  // const pendingEthReward = await masterChefContract.pendingDVM('35', account)
  // const pendingBtcReward = await masterChefContract.pendingDVM('36', account)
  // const pendingXrpReward = await masterChefContract.pendingDVM('37', account)

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON(), 1: new BigNumber(pendingWbnbReward.toString()).toJSON(),  2: new BigNumber(pendingBusdReward.toString()).toJSON(), 3: new BigNumber(pendingLytReward.toString()).toJSON()}
}
