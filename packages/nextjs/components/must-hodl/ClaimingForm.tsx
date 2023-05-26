import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ClaimingForm: React.FC = () => {
  const { address } = useAccount();

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "claimFees",
  });

  const { data: claimable } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getClaimableRewards",
    args: [address],
  });

  return (
    <div className=" p-5 rounded-lg shadow-lg">
      <div className="flex flex-col mb-5 p-5 rounded-lg text-zinc-200 items-center font-bold shadow-lg justify-center bg-accent bg-opacity-80">
        <h2>Claimable Eth: {claimable ? ethers.utils.formatEther(claimable) : "0"}</h2>
        <h2>Stakes Share: 2.2%</h2>
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
