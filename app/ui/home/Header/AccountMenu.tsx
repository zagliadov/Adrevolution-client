import { FC } from "react";
import Link from "next/link";
import { SignOutButton } from "../../Button/SignOutButton/SignOutButton";
import { UserInfo } from "./UserInfo";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface IProps {
  dashboardSettingsLinks?: any;
}
export const AccountMenu: FC<IProps> = ({ dashboardSettingsLinks }) => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="m-1 rounded-full p-1 hover:bg-base-200"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-auto"
      >
        <li>
          <UserInfo />
        </li>
        {dashboardSettingsLinks ? (
          dashboardSettingsLinks.map((link: any) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))
        ) : (
          <>
            <li>
              <Link href="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </>
        )}
        <li>
          <SignOutButton>Sign Out</SignOutButton>
        </li>
      </ul>
    </div>
  );
};
