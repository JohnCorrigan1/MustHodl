import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

const StakeModal: React.FC<{
  stakeModal: boolean;
  setStakeModal: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = props => {
  const closeHandler = () => {
    props.setStakeModal(false);
    props.setIsLoading(true);
  };

  if (!props.stakeModal) return null;

  return (
    <>
      <div
        onClick={closeHandler}
        className="modal bg-black bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 z-[2000]"
      ></div>
      <div className="bg-zinc-900 text-zinc-200 flex flex-col items-center rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 justify-center -translate-y-1/2 w-1/2 max-w-xl  h-1/2 z-[2001]">
        <div
          className="hover:bg-zinc-600 hover:scale-105 rounded-full flex p-1 cursor-pointer bg-opacity-50 active:scale-95 absolute top-3 right-3"
          onClick={closeHandler}
        >
          <Image src="/close_white_24.svg" height={30} width={30} alt="X" />
        </div>
        <div className="flex flex-col items-center gap-20">
          {props.isLoading ? (
            <div>
              <h1 className="text-2xl font-bold">Processing Transaction...</h1>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">Ok get outta here idiot</h1>
            </div>
          )}

          {props.isLoading ? (
            <div className=" mt-10 w-24 h-24 rounded-full border-t-2 border-r-rose-500 border-r-2 border-l-2 border-l-emerald-500 border-t-indigo-600 animate-spin"></div>
          ) : (
            <div className="wrapper">
              {" "}
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StakeModal;
