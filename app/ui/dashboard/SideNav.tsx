import { FC } from "react";
import Link from "next/link";
import { NavLinks } from "@/app/ui/dashboard/NavLinks";
import { PowerIcon } from "@heroicons/react/24/outline";
import { SignOutButton } from "../Button/SignOutButton/SignOutButton";

export const SideNav: FC = () => {
  return (
    <nav className="hidden md:flex h-full w-52 flex-col px-3 py-4 md:px-2 fixed left-0">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-primary p-4 h-40"
        href="/"
      >
        <div className="text-white w-40">LogoUI</div>
      </Link>
      <div className="md:flex hidden grow overflow-auto flex-wrap md:flex-nowrap flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-base-200 md:block"></div>
        <div>
          <SignOutButton className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-base-200 p-3 text-sm font-medium hover:bg-primary md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </SignOutButton>
        </div>
      </div>
    </nav>
  );
};
