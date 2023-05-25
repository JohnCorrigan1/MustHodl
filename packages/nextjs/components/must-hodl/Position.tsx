import abi from "../../lib/abi";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

const Position: React.FC<{ eth: string; veEth: string; index: any }> = props => {
  const isConnected = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x5E8bF6F4f0d1816280a606d67E405B70882A3b32",
    abi: abi,
    functionName: "unstake",
    args: [props.index],
    onError(error) {
      console.log("Error", error);
    },
  });
  //   const { write: unstake, isSuccess: isUnstakeStarted, data: unstakeData } = useContractWrite(config);
  const { write: unstake } = useContractWrite(config);

  //   const { isSuccess: txSuccess } = useWaitForTransaction({
  // hash: unstakeData?.hash,
  //   });

  const handleUnstake = () => {
    if (!isConnected) return;
    //@ts-ignore
    unstake?.(props.index);
  };

  return (
    <div className="shadow-xl">
      <ul className="flex font-bold justify-between p-4 bg-primary-focus text-primary-content rounded-lg items-center">
        <li className="">Locked Eth: {props.eth}</li>
        <li>Locked VeEth: {props.veEth}</li>
        <li>Lock duration: 120days</li>
        <li
          onClick={handleUnstake}
          className=" shadow-lg bg-secondary p-3 rounded-lg hover:scale-110 active:scale-95 cursor-pointer duration-150 ease-in-out"
        >
          Unstake
        </li>
      </ul>
    </div>
  );
};

export default Position;
