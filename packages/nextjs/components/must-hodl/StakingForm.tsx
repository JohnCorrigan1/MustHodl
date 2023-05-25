import { Dispatch, SetStateAction, useEffect, useState } from "react";
import abi from "../../lib/abi";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

// import StakeModal from "./StakeModal";

const StakingForm: React.FC<{
  isConnected: boolean;
  stakeModal: boolean;
  setStakeModal: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = props => {
  const [lockTime, setLockTime] = useState<any>("1");
  const [amount, setAmount] = useState<any>("0");
  const [willRecieve, setWillRecieve] = useState("");
  // const [stakeModal, setStakeModal] = useState(false);

  //goerli 0xDF7DDC6154224338d7F2022Abf2b065969518E15
  const { config } = usePrepareContractWrite({
    address: "0x5E8bF6F4f0d1816280a606d67E405B70882A3b32",
    abi: abi,
    functionName: "stake",
    args: [lockTime.toString()],
    onError(error) {
      console.log("Error", error);
    },
    overrides: {
      value: ethers.utils.parseEther(amount.toString()),
    },
  });
  const { write: stake, isSuccess: isStakeStarted, data: stakeData } = useContractWrite(config);

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  });

  const handleLockTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setLockTime(0);
      return;
    }
    setLockTime(e.target.value);
    if (amount > 0) {
      setWillRecieve(((amount * parseFloat(lockTime)) / 120).toString());
    }
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(0);
      return;
    }
    setAmount(e.target.value);
    if (lockTime !== "") {
      setWillRecieve(((parseFloat(amount) * parseFloat(lockTime)) / 120).toString());
    }
  };

  const handleStake = () => {
    if (lockTime === "" || amount <= 0) return;
    if (!props.isConnected) return;
    //@ts-ignore
    stake?.(lockTime);
    props.setStakeModal(true);
  };

  useEffect(() => {
    if (txSuccess) {
      props.setIsLoading(false);
    }
    if (isStakeStarted && !txSuccess) {
      props.setIsLoading(true);
    }
  }, [isStakeStarted, txSuccess]);

  return (
    <div className=" p-5 rounded-lg shadow-lg">
      {/* <StakeModal stakeModal={stakeModal} setStakeModal={setStakeModal} /> */}

      <div className="flex flex-col">
        <label htmlFor="lock" className="font-bold text-content">
          Lock Time
        </label>
        <input
          // step="1"
          value={lockTime}
          onChange={handleLockTime}
          type="text"
          inputMode="decimal"
          name="lock"
          placeholder="0.0"
          pattern="^[0-9]*[.,]?[0-9]*$"
          minLength={1}
          className="rounded-md p-2 bg-accent bg-opacity-80 text-secondary-content font-bold focus:p-3 duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="amount" className="font-bold text-content">
          Amount Eth
        </label>
        <input
          value={amount}
          onChange={handleAmount}
          type="text"
          inputMode="decimal"
          name="amount"
          placeholder="0.0"
          pattern="^[0-9]*[.]?[0-9]*$"
          minLength={1}
          className="rounded-md p-2 bg-accent bg-opacity-80 text-secondary-content font-bold focus:p-3 duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-col mt-5 mb-5 p-5 rounded-lg items-center font-bold shadow-lg bg-accent bg-opacity-80 ">
        <h2>Will Recieve: {willRecieve} VeEth</h2>
        <h2>Stakes Share: 2.2%</h2>
      </div>
      <button
        onClick={handleStake}
        className=" btn btn-primary bg-accent shadow-lg w-full hover:bg-accent-focus hover:scale-[1.02] bg-opacity-80 "
      >
        Stake
      </button>
    </div>
  );
};

export default StakingForm;
