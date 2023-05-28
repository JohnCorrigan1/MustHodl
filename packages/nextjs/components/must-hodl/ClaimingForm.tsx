import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ClaimingForm: React.FC = () => {
  const { address } = useAccount();
  const [stakeShare, setStakeShare] = useState("0");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "MustHodl",
    functionName: "claimFees",
  });

  const { data: claimable } = useScaffoldContractRead({
    contractName: "MustHodl",
    functionName: "getClaimableRewards",
    args: [address],
  });

  const { data: usersFakeEth } = useScaffoldContractRead({
    contractName: "MustHodl",
    functionName: "getUsersVeEth",
    args: [address],
  });

  const { data: totalFakeEth } = useScaffoldContractRead({
    contractName: "MustHodl",
    functionName: "getTotalFakeEth",
  });

  useEffect(() => {
    if (usersFakeEth && totalFakeEth)
      setStakeShare(((parseInt(usersFakeEth.toString()) / parseInt(totalFakeEth.toString())) * 100).toFixed(2));
  }, [usersFakeEth, totalFakeEth]);

  return (
    <div className=" p-5 rounded-lg shadow-lg">
      <div className="flex flex-col mb-5 p-5 rounded-lg text-zinc-200 items-center font-bold shadow-lg justify-center bg-accent bg-opacity-80">
        <h2>Claimable Eth: {claimable ? ethers.utils.formatEther(claimable) : "0"}</h2>
        <h2>Stakes Share: {stakeShare}%</h2>
      </div>
      <button
        onClick={writeAsync}
        className=" btn btn-primary bg-accent shadow-lg w-full hover:bg-accent-focus hover:scale-[1.02] bg-opacity-80 "
      >
        Claim
      </button>
    </div>
  );
};

export default ClaimingForm;
