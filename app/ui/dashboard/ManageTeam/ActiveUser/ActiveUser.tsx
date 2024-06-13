"use client";

import { FC } from "react";

export const ActiveUser: FC = () => {
  return (
    <div className="2xl:order-2 order-1 2xl:w-1/5">
      <div className="flex items-center justify-between border border-base-300 rounded-md p-4">
        <span className="uppercase font-bold">Active users</span>
        <div className="bg-base-200 rounded-lg px-3 text-sm">
          <span>1 of 1</span>
        </div>
      </div>
    </div>
  );
};
