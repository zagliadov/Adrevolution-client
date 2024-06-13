"use client";

import { dashboardSettingsLinks } from "../lib/constants/links";
import { useGetCompany } from "../lib/queries/company";
import { DrawerMenu } from "../ui/dashboard/DrawerMenu";
import { SideNav } from "../ui/dashboard/SideNav";
import { AccountMenu } from "../ui/home/Header/AccountMenu";
import _ from "lodash";
import { Spinner } from "../ui/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useGetCompany();

  return (
    <div className="flex min-h-screen flex-row">
      {isPending ? (
        <div
          className={`fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-slate-100`}
        >
          <Spinner className="text-gray-600 w-24 h-24" />
        </div>
      ) : (
        <>
          <SideNav />

          <main className="w-full md:ml-52 pt-6">
            <nav className="px-6 flex items-center justify-between">
              <span>{data?.companyName}</span>
              <div className="flex items-start md:items-center">
                <DrawerMenu />
                <AccountMenu dashboardSettingsLinks={dashboardSettingsLinks} />
              </div>
            </nav>
            {children}
          </main>
        </>
      )}
    </div>
  );
}
