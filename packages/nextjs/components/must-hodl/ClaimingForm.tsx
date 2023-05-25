import { useEffect, useState } from "react";
import abi from "../../lib/abi";
import { ethers } from "ethers";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

const ClaimingForm: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [claimable, setClaimable] = useState<any>(0);
  const { isConnected } = useAccount();

  const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

  const { config } = usePrepareContractWrite({
    address: "0x5E8bF6F4f0d1816280a606d67E405B70882A3b32",
    abi: abi,
    functionName: "claimFees",
    // args: [lockTime.toString()],
    onError(error) {
      console.log("Error", error);
    },
    // overrides: {
    //   value: ethers.utils.parseEther(amount.toString()),
    // },
  });
  const { write: claimFees } = useContractWrite(config);

  // const { isSuccess: txSuccess } = useWaitForTransaction({
  // hash: stakeData?.hash,
  // });

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
    if (!isConnected) return;
    getData();
  }, [contract]);

  const getData = async () => {
    console.log(contract);

    const user = await window.ethereum?.request({ method: "eth_accounts" });
    const bigNum = await contract.Stakers(user![0]);
    console.log("real", ethers.utils.formatEther(bigNum));
    setClaimable(ethers.utils.formatEther(bigNum));
    console.log("claimabel", await contract.Stakers("0xDFaD36565B8753e9D2b0bdCbaF652C17f7733047"));
  };

  const handleClaim = async () => {
    claimFees?.();
  };

  if (!contract) return <div>Loading...</div>;

  return (
    <div className=" p-5 rounded-lg shadow-lg">
      <div className="flex flex-col mb-5 p-5 rounded-lg text-zinc-200 items-center font-bold shadow-lg justify-center bg-accent bg-opacity-80">
        <h2>Claimable Eth: {claimable}</h2>
        <h2>Stakes Share: 2.2%</h2>
      </div>
      <button
        onClick={handleClaim}
        className=" btn btn-primary bg-accent shadow-lg w-full hover:bg-accent-focus hover:scale-[1.02] bg-opacity-80 "
      >
        Claim
      </button>
    </div>
  );
};

export default ClaimingForm;
