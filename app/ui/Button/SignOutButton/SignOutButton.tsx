"use client";

import { useSignOut } from "@/app/lib/hooks/auth/useSignOut";
import { FC, ReactNode } from "react";

interface IProps {
  className?: string;
  children: ReactNode;
}
export const SignOutButton: FC<IProps> = ({ className, children }) => {
  const { isPending, signOut } = useSignOut();

  const handleSignOut = async () => {
    await signOut({});
  };
  return (
    <button onClick={handleSignOut} className={`${className}`}>
      {children}
    </button>
  );
};
