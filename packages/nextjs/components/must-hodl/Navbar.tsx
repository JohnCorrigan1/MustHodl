import Link from "next/link";
// import ThemeChanger from "./ThemeChanger";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-200 flex justify-between shadow-lg">
      <div>
        <Link href="/">
          <h1 className="btn btn-ghost normal-case text-xl">Must Hodl</h1>
        </Link>
        <Link href="/positions">
          <h1 className="btn btn-ghost normal-case text-xl">Positions</h1>
        </Link>
        <Link href="/about">
          <h1 className="btn btn-ghost normal-case text-xl">How it Works?</h1>
        </Link>
      </div>
      <div className="flex gap-10 items-center">
        {/* <ThemeChanger /> */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
