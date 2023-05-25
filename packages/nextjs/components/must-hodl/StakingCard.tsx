import { Dispatch, SetStateAction, useState } from "react";
import ClaimingForm from "./ClaimingForm";
import StakingForm from "./StakingForm";

const StakingCard: React.FC<{
  isConnected: boolean;
  stakeModal: boolean;
  setStakeModal: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = props => {
  const [stake, setStake] = useState(true);

  const handleSetClaim = () => {
    setStake(false);
  };

  const handleSetStake = () => {
    setStake(true);
  };

  return (
    <div className=" mt-10  rounded-xl shadow-lg w-1/4  hover:blur-none duration-300 min-w-[500px] staking bg-base-300">
      <div className="flex justify-between ">
        <h1
          className={`text-2xl font-bold w-1/2 flex justify-center p-5 hover:cursor-pointer hover:text-zinc-200 duration-300 rounded-tl-xl border-2 border-black ${
            stake ? " text-content bg-accent-focus " : "bg-primary"
          }`}
          onClick={handleSetStake}
        >
          Stake
        </h1>
        <h1
          className={`text-2xl font-bold w-1/2 flex justify-center p-5 hover:cursor-pointer hover:text-zinc-200 duration-300 rounded-tr-xl border-2 border-black ${
            !stake ? "bg-accent-focus text-content" : "bg-primary"
          }`}
          onClick={handleSetClaim}
        >
          Claim Fees
        </h1>
      </div>
      {stake ? (
        <StakingForm
          isConnected={props.isConnected}
          stakeModal={props.stakeModal}
          setStakeModal={props.setStakeModal}
          isLoading={props.isLoading}
          setIsLoading={props.setIsLoading}
        />
      ) : (
        <ClaimingForm />
      )}
    </div>
  );
};

export default StakingCard;
