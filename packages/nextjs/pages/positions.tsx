import Link from "next/link";
import Position from "../components/must-hodl/Position";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Positions: NextPage = () => {
  const { address } = useAccount();

  const { data: stakes } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getStakes",
    args: [address],
  });

  return (
    <div className="app">
      {/* <Navbar /> */}
      <div className="flex justify-center items-center flex-col mt-16">
        <h1 className="text-3xl font-bold text-content">View and Unstake Positions</h1>
        <div className="flex flex-col p-10 w-2/3 staking rounded-xl border-2 border-primary-focus mt-10 gap-5">
          {!stakes && (
            <div className="flex flex-col justify-center items-center gap-5 w-full">
              <h3 className="text-xl font-semibold">No positions found...</h3>
              <Link href="/mustHodl">
                <button className="btn btn-primary px-10 py-2">Hodl</button>
              </Link>
            </div>
          )}
          {stakes?.map((position: any, index: number) => {
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
