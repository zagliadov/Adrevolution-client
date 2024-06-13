import { ROUTES } from "@/app/lib/constants/routes";
import Link from "next/link";
import { FC } from "react";

export const Logo: FC = () => {
  return (
    <div className="flex-1">
      <Link href={ROUTES.HOME} className="btn btn-ghost text-xl">
        Adrevolution
      </Link>
    </div>
  );
};
