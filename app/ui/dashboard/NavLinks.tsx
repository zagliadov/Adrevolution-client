import { FC } from "react";
import { links } from "@/app/lib/constants/links";
import Link from "next/link";
import _ from "lodash";
import { CreateDropdownMenu } from "./CreateDropdownMenu";

export const NavLinks: FC = () => {
  return (
    <>
      <CreateDropdownMenu />
      {_.map(links, (link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-8 grow items-center justify-center gap-2 rounded-md bg-base-200 p-3 text-sm font-medium hover:bg-primary md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};
