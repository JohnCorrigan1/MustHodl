import Image from "next/image";

const AppInfo: React.FC = () => {
  return (
    <div className="justify-center items-center w-full p-24 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Stake</h1>
      <div className="flex p-3 border-2 border-primary shadow-lg rounded-lg">
        <p>
          Input an amount of Eth and the duration you would like to lock it for (currently in seconds max 120s). Locking
          your eth gives you veEth. The longer you stake your eth for the more veEth you get.
        </p>
      </div>
      <div className="w-1/2 flex gap-10 justify-between p-10">
        <div className="flex flex-col p-10 bg-primary rounded-lg w-fit text-primary-content shadow-2xl">
          <h2 className="text-xl ml-auto mr-auto border-b-2">Rates for veEth</h2>
          <div className="flex p-3 w-[250px] justify-between">
            <p className="p-3 flex justify-center min-w-[10%]">Eth</p>
            <p className="p-3 flex justify-center min-w-[10%]">Duration</p>
            <p className="p-3 flex justify-center min-w-[10%]">veEth</p>
          </div>
          <div className="flex p-3 w-[250px] justify-between">
            <p className="p-3 flex justify-center min-w-[10%]">1</p>
            <p className="p-3 flex justify-center min-w-[10%]">30s</p>
            <p className="p-3 flex justify-center min-w-[10%]">0.25</p>
          </div>
          <div className="flex p-3 w-[250px] justify-between">
            <p className="p-3 flex justify-center min-w-[10%]">1</p>
            <p className="p-3 flex justify-center min-w-[10%]">60s</p>
            <p className="p-3 flex justify-center min-w-[10%]">0.5</p>
          </div>
          <div className="flex p-3 w-[250px] justify-between">
            <p className="p-3 flex justify-center">1</p>
            <p className="p-3 flex justify-center">120s</p>
            <p className="p-3 flex justify-center ">1</p>
          </div>
        </div>
        <Image src="/assets/eth3d.png" height={400} width={500} alt="3d" />
      </div>
      <h1 className="text-3xl font-bold mt-5">Unstake/Rewards</h1>
      <div className="flex p-3 border-2 border-primary shadow-lg gap-5 rounded-lg flex-col">
        <p>
          So why stake here? What does veEth even do? Well, in order to understad the rewards we need to understand the
          consequences. If you unstake before your set time you take a 10% penalty. This 10% penalty is then distributed
          to all the other stakers. The fees are distrubted based on your veEth balance. So if the there is 10 veEth in
          the contract and you have 1 veEth you will get 10% of the total fees generated.
        </p>
        <p>
          You don&apos;t have to wait until your unlock date to reap the benefits. Every week fees will be distributed
          to all stakers. In order to distrubute the fees a transaction must take place. Because this transaction can
          get expensive there is a bounty to distrubute the fees. The bounty is 0.1% of the total fees generated for
          that week. This bounty is claimable 7 days after the last distrubution. (currently after 1 minute)
        </p>
      </div>
    </div>
  );
};

export default AppInfo;
