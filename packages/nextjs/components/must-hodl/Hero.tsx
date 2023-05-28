import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="hero h-[90vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src="/assets/ethereum.jpeg"
          height={550}
          width={700}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="eth"
        />
        <div className="">
          <h1 className="text-5xl font-bold">Must Hodl</h1>
          <p className="py-6">
            {" "}
            So you don&apos;t have the discipline to hold a token? Give yourself no choice... Lock it up! You can lock
            your Eth for as long as you want.
          </p>
          <Link href="/">
            <button className="btn btn-primary">I&apos;m Sold!</button>
          </Link>
        </div>
      </div>
      <div className="flex mt-auto items-center gap-5 btn btn-ghost">
        <button className="font-bold text-lg text-accent">Read More</button>
        <Image src="/assets/down.svg" width={40} height={40} className="" alt="down"></Image>
      </div>
    </div>
  );
};
// If you unstake before your set time you take a 10% penalty.
// This 10% penalty is then distributed to all the other stakers.

export default Hero;
