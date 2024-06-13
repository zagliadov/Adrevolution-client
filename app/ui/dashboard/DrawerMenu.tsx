import { Bars4Icon, PowerIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { Logo } from "../Logo/Logo";
import { links } from "@/app/lib/constants/links";
import Link from "next/link";
import { SignOutButton } from "../Button/SignOutButton/SignOutButton";
import _ from "lodash";

export const DrawerMenu: FC = () => {
  return (
    <div className="drawer md:hidden flex z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle cursor-pointer" />
      <div className="drawer-content m-1 rounded-full p-1 hover:bg-base-200">
        <label htmlFor="my-drawer" className="cursor-pointer">
          <Bars4Icon className="w-6 h-6" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-80 min-h-full bg-base-200">
          <Logo />
          <div className="flex flex-col justify-between">
            {_.map(links, (link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex h-10 grow items-center gap-2 rounded-md bg-base-200 p-3 text-sm font-medium hover:bg-primary"
                >
                  <LinkIcon className="w-6" />
                  <p className="block">{link.name}</p>
                </Link>
              );
            })}
            <div className="hidden h-auto w-full grow rounded-md bg-base-200"></div>
            <div>
              <SignOutButton className="flex h-10 w-full grow items-center gap-2 rounded-md bg-base-200 p-3 text-sm font-medium hover:bg-primary">
                <PowerIcon className="w-6" />
                <div className="block">Sign Out</div>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
