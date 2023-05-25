import { useEffect, useState } from "react";
import abi from "../../lib/abi";
import { ethers } from "ethers";

const StakingStats: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [ethStaked, setEthStaked] = useState<any>(0);
  const [veEth, setVeEth] = useState<any>(0);

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
  };

  if (!contract) return <div>Loading...</div>;

  return (
    <div className="bg-zinc-500 bg-opacity-30 staking-stats font-bold border-4 rounded-xl flex  flex-col border-indigo-700 w-fit p-5 text-zinc-200 text-2xl justify-center shadow-lg">
      <h2 className="">Total Eth Staked: {ethStaked}</h2>
      <h2>Total VeEth: {veEth}</h2>
      {/* <h2>Avg Time Locked: 180 days</h2> */}
    </div>
  );
};

export default StakingStats;
