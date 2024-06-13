"use client";

import { FC } from "react";
import useCompanySettingsNavigation from "@/app/lib/hooks/navigation/useCompanySettingsNavigation";
import Link from "next/link";
import _ from "lodash";

export const MobileSideNavSettings: FC = () => {
  const {
    businessManagementLinks,
    teamOrganizationLinks,
    clientCommunicationLinks,
  } = useCompanySettingsNavigation();
  return (
    <ul className="menu menu-horizontal -ms-10 px-1 xl:hidden">
      <li>
        <details>
          <summary>Settings</summary>
          <ul className="menu bg-base-200 w-60 rounded-box z-30 -left-32">
            <li>
              <h2 className="menu-title">Business management</h2>
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
              <h2 className="menu-title">Team organization</h2>
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
              <h2 className="menu-title">Client communication</h2>
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
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};
