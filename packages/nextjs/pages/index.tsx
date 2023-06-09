import Head from "next/head";
import CountDown from "../components/must-hodl/CountDown";
import StakingCard from "../components/must-hodl/StakingCard";
import Stats from "../components/must-hodl/Stats";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-ETH 2</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="app w-full bg-base">
        <div className="mt-10 flex w-full justify-center">
          <Stats />
        </div>
        <div className="w-full flex justify-center mt-10">
          <CountDown />
        </div>
        <div className="flex justify-center">
          <StakingCard />
        </div>
      </div>
    </>
  );
};

export default Home;
