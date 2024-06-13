"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export const TrySignUpButton: FC = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSignUp = () => {
    if (email) {
      router.push(`/sign-up?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <div className="join">
      <input
        className="input input-bordered join-item"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn join-item btn-primary rounded-r-full"
        onClick={handleSignUp}
      >
        Try Sign Up
      </button>
    </div>
  );
};
