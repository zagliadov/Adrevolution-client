import { FC } from "react";
import { TrySignUpButton } from "./TrySignUpButton";

export const Intro: FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary min-h-screen">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Manage Your Transport Business Efficiently
            </h1>
            <p className="py-6">
              Make operations smoother for you and your clients. Our service
              helps you handle requests, plan routes, invoice, and receive
              payments—all in one place.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <TrySignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
};
