"use client";
import { FC } from "react";
import _ from "lodash";
import Link from "next/link";
import useCompanySettingsNavigation from "@/app/lib/hooks/navigation/useCompanySettingsNavigation";

export const SideNavSettings: FC = () => {
  const {
    businessManagementLinks,
    teamOrganizationLinks,
    clientCommunicationLinks,
  } = useCompanySettingsNavigation();
  return (
    <nav className="flex-none w-60 pt-12 hidden xl:flex md:flex-col">
      <span className="font-bold text-2xl">Settings</span>
      <div className="pt-4 menu menu-horizontal">
        <span className="uppercase font-bold">Business management</span>
        <ul className="py-4">
          {_.map(businessManagementLinks, (link) => {
            return (
              <li>
                <Link
                  href={link.href}
                  className={`${link.current ? "text-primary" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <span className="uppercase font-bold">team organization</span>
        <ul className="py-4">
          {_.map(teamOrganizationLinks, (link) => {
            return (
              <li>
                <Link
                  href={link.href}
                  className={`${link.current ? "text-primary" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <span className="uppercase font-bold">client communication</span>
        <ul className="py-4">
          {_.map(clientCommunicationLinks, (link) => {
            return (
              <li>
                <Link
                  href={link.href}
                  className={`${link.current ? "text-primary" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
