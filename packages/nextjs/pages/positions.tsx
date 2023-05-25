import { useEffect, useState } from "react";
import Link from "next/link";
import Position from "../components/must-hodl/Position";
import abi from "../lib/abi";
import { ethers } from "ethers";
import { NextPage } from "next";

const Positions: NextPage = () => {
  const [contract, setContract] = useState<any>(null);
  const [positions, setPositions] = useState<any>([]);

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
    const user = await window.ethereum?.request({ method: "eth_accounts" });
    if (user) {
      setPositions(await contract.getStakes(user[0]));
    }
  };

  return (
    <div className="app">
      {/* <Navbar /> */}
      <div className="flex justify-center items-center flex-col mt-16">
        <h1 className="text-3xl font-bold text-content">View and Unstake Positions</h1>
        <div className="flex flex-col p-10 w-2/3 staking rounded-xl border-2 border-primary-focus mt-10 gap-5">
          {positions.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-5 w-full">
              <h3 className="text-xl font-semibold">No positions found...</h3>
              <Link href="/mustHodl">
                <button className="btn btn-primary px-10 py-2">Hodl</button>
              </Link>
            </div>
          )}
          {positions.map((position: any, index: number) => {
            console.log(index);
            return (
              <Position
                eth={ethers.utils.formatEther(position.amount)}
                veEth={ethers.utils.formatEther(position.fakeEth)}
                index={index.toString()}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Positions;
