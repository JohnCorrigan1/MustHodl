import { useEffect, useState } from "react";
import abi from "../../lib/abi";
import { ethers } from "ethers";

const Stats: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [ethStaked, setEthStaked] = useState("0");
  const [veEth, setVeEth] = useState("0");
  const [fees, setFees] = useState("0");

  const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

  useEffect(() => {
    const getContract = async () => {
      const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraId}`);
      const contract = new ethers.Contract("0x5E8bF6F4f0d1816280a606d67E405B70882A3b32", abi, provider);
      setContract(contract);
    };
    getContract();
  }, []);

  useEffect(() => {
    if (!contract) {
      return;
    }
    getData();
  }, [contract]);

  const getData = async () => {
    setEthStaked(ethers.utils.formatEther(await contract.totalStakedAmount()));
    setVeEth(parseInt(ethers.utils.formatEther(await contract.totalFakeEth())).toFixed(2));
    setFees(parseFloat(ethers.utils.formatEther(await contract.accuredFees())).toFixed(2));
  };

  if (!contract) return <div>Loading...</div>;

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
        <div className="stat-value text-primary">{ethStaked}</div>
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
        <div className="stat-value text-secondary">{veEth}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-title">This weeks Fees</div>
        <div className="stat-value">{fees}</div>
      </div>
    </div>
  );
};

export default Stats;
