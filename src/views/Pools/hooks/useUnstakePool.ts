import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { unstakeFarm } from 'utils/calls'
import { useMasterchef, useSousChef } from 'hooks/useContract'
import { BIG_TEN } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'

const sousUnstake = async (sousChefContract, amount, decimals) => {
  const gasPrice = getGasPrice()
  const tx = await sousChefContract.withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), {
    gasPrice,
  })
  const receipt = await tx.wait()
  return receipt.status
}

const sousEmergencyUnstake = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  const tx = await sousChefContract.emergencyWithdraw({ gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

const useUnstakePool = (sousId, farmId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId < 40) {
        await unstakeFarm(masterChefContract, farmId, amount)
      } else if (enableEmergencyWithdraw) {
        await sousEmergencyUnstake(sousChefContract)
      } else {
        await sousUnstake(sousChefContract, amount, decimals)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, enableEmergencyWithdraw, masterChefContract, sousChefContract, sousId, farmId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
