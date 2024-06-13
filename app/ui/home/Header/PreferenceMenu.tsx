"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FC } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { SignOutButton } from "../../Button/SignOutButton/SignOutButton";

export const PreferenceMenu: FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);
  return (
    <motion.div
      className="bg-primary sticky top-0 z-10 h-10 w-full flex items-center"
      style={{ opacity }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-center justify-end container mx-auto gap-6">
        <div className="flex items-center">
          <span>Dansk</span>
          <div className="divider divider-horizontal"></div>
          <SignOutButton>Log Out</SignOutButton>
        </div>

        <div className="flex items-center">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            <SunIcon className="swap-on fill-current w-6 h-6" />
            <MoonIcon className="swap-off fill-current w-6 h-6" />
          </label>
        </div>
      </div>
    </motion.div>
  );
};
