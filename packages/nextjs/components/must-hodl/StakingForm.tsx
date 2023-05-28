import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const StakingForm: React.FC = () => {
  const [lockTime, setLockTime] = useState<any>("1");
  const [amount, setAmount] = useState<any>("0");
  const [willRecieve, setWillRecieve] = useState("");
  const [stakeShare, setStakeShare] = useState("0");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "MustHodl",
    functionName: "stake",
    args: [lockTime.toString()],
    value: amount.toString(),
  });

  const { data: totalFakeEth } = useScaffoldContractRead({
    contractName: "MustHodl",
    functionName: "getTotalFakeEth",
  });

  useEffect(() => {
    setWillRecieve(((parseFloat(amount) * parseFloat(lockTime)) / 120).toFixed(2).toString());
    if (!totalFakeEth) return;
    setStakeShare(
      (
        parseFloat(ethers.utils.formatEther(totalFakeEth)) /
        ((parseFloat(amount) * parseFloat(lockTime)) / 120 + parseFloat(ethers.utils.formatEther(totalFakeEth)))
      ).toFixed(4),
    );
  }, [amount, lockTime, totalFakeEth]);

  const handleLockTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setLockTime(0);
      return;
    }
    setLockTime(e.target.value);
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className=" p-5 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label htmlFor="lock" className="font-bold text-content">
          Lock Time
        </label>
        <input
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
          max={1000000}
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
        <h2>Stakes Share: {(100 - parseFloat(stakeShare) * 100).toFixed(2)}%</h2>
      </div>
      <button
        onClick={writeAsync}
        className=" btn btn-primary bg-accent shadow-lg w-full hover:bg-accent-focus hover:scale-[1.02] bg-opacity-80 "
      >
        Stake
      </button>
    </div>
  );
};

export default StakingForm;
