import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Stats: React.FC = () => {
  const { data: lockedEth } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getTotalStakedAmount",
  });

  const { data: fakeEth } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getTotalFakeEth",
  });

  const { data: accruedFees } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getAccruedFees",
  });

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Locked Eth</div>
        <div className="stat-value text-primary">
          {lockedEth ? parseFloat(ethers.utils.formatEther(lockedEth)).toFixed(2) : "0"}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div className="stat-title">Locked veEth</div>
        <div className="stat-value text-secondary">
          {fakeEth ? parseFloat(ethers.utils.formatEther(fakeEth)).toFixed(2) : "0"}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-title">This weeks Fees</div>
        <div className="stat-value">{accruedFees ? parseFloat(ethers.utils.formatEther(accruedFees)) : "0"}</div>
      </div>
    </div>
  );
};

export default Stats;
