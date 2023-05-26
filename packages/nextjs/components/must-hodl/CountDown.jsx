import React, { useEffect, useState } from "react";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CountDown = () => {
  // const [contract, setContract] = useState(null);
  // const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
  const [isAvailable, setIsAvailable] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "distributeFees",
  });

  const { data: lastDistribution } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getLastDistribtuionTime",
  });

  const getDifference = lastDistribution => {
    const now = new Date();
    //7 days after last distribution
    // const target = new Date(lastDistribution + 7 * 24 * 60 * 60 * 1000);

    //5minutes after last distribution
    const target = new Date(lastDistribution + 5 * 60 * 1000);

    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setIsAvailable(true);
      return;
    }

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    diff -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    diff -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(diff / (60 * 1000));
    diff -= minutes * 60 * 1000;
    const seconds = Math.floor(diff / 1000);

    setCountdown({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  };

  // useEffect(() => {
  //   const getContract = async () => {
  //     const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraId}`);
  //     const contract = new ethers.Contract("0x5E8bF6F4f0d1816280a606d67E405B70882A3b32", abi, provider);
  //     setContract(contract);
  //   };
  //   getContract();
  // }, []);

  useEffect(() => {
    // if (!contract) return;
    // const getLastDistribution = async () => {
    // const lastDistribution = await contract.lastDistributionTime();

    if (!lastDistribution) return;

    getDifference(lastDistribution * 1000);
    // };
    // getLastDistribution();
  }, [lastDistribution]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        const newCountdown = { ...prevCountdown };

        if (newCountdown.seconds > 0) {
          newCountdown.seconds--;
        } else {
          newCountdown.seconds = 59;

          if (newCountdown.minutes > 0) {
            newCountdown.minutes--;
          } else {
            newCountdown.minutes = 59;

            if (newCountdown.hours > 0) {
              newCountdown.hours--;
            } else {
              newCountdown.hours = 23;

              if (newCountdown.days > 0) {
                newCountdown.days--;
              } else {
                clearInterval(interval);
              }
            }
          }
        }

        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {!isAvailable && (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": countdown.days }}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": countdown.hours }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": countdown.minutes }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": countdown.seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
      {isAvailable && (
        <div className="w-full flex justify-center flex-col items-center p-5 ">
          <h1>Claim the bounty!</h1>
          <button className="btn btn-primary" disabled={!isAvailable} onClick={writeAsync}>
            Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default CountDown;
