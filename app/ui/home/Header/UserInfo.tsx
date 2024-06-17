"use client";

import { useGetUserDetails } from "@/app/lib/queries/user";
import { FC } from "react";
import Image from "next/image";

export const UserInfo: FC = () => {
  const { data } = useGetUserDetails();

  return (
    <>
      <div className="menu-title flex items-center justify-between gap-4">
        <div className="w-10 h-10 rounded-full avatar">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt="Tailwind CSS Navbar component"
            src="/photo.jpg"
            className="rounded-full"
          />
        </div>
        <div>
          <p>
            {data?.firstName} {data?.lastName}
          </p>
          <span>{data?.email}</span>
        </div>
      </div>
    </>
  );
};
