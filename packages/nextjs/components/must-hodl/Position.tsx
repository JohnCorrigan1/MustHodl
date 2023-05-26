import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Position: React.FC<{ eth: string; veEth: string; index: any }> = props => {
  const { address } = useAccount();
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "unstake",
    args: [props.index],
  });

  const { data: lockDuration } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getLockDuration",
    args: [address, props.index],
  });

  const { data: unlockTime } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getUnlockTime",
    args: [address, props.index],
  });

  if (lockDuration) console.log(parseInt(lockDuration.toString()), "minutes");
  if (unlockTime) console.log(new Date(parseInt(unlockTime.toString()) * 1000));

  return (
    <div className="shadow-xl">
      <ul className="flex font-bold justify-between p-4 bg-primary-focus text-primary-content rounded-lg items-center">
        <li className="">Eth: {props.eth}</li>
        <li>VeEth: {props.veEth}</li>
        <li>Lock: {lockDuration ? lockDuration.toString() : "0"}s</li>
        <li>
          Unlock: {unlockTime ? new Date(parseInt(unlockTime.toString()) * 1000).toLocaleDateString("en-us") : "0"}
        </li>
        <li
          onClick={writeAsync}
          className=" shadow-lg bg-secondary p-3 rounded-lg hover:scale-110 active:scale-95 cursor-pointer duration-150 ease-in-out"
        >
          Unstake
        </li>
      </ul>
    </div>
  );
};

export default Position;
