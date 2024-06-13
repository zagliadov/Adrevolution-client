"use client";

import { FC } from "react";
import { AuthMenu } from "./AuthMenu";
import { Logo } from "../../Logo/Logo";
import { motion, useScroll, useTransform } from "framer-motion";
import { PreferenceMenu } from "./PreferenceMenu";

export const Header: FC = () => {
  const { scrollY } = useScroll();
  const navPosition = useTransform(scrollY, [0, 50], [40, 0]);

  return (
    <header className="relative flex flex-col items-center">
      <PreferenceMenu />
      <motion.nav
        className="fixed z-10 navbar bg-base-100 h-20 w-full"
        style={{ top: navPosition }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center w-full px-4">
          <Logo />
          <div className="flex-none gap-4 flex items-center">
            <AuthMenu />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};
