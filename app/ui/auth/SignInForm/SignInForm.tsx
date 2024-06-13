"use client";

import { FC, ReactNode } from "react";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import { useSignInForm } from "@/app/lib/hooks/auth/useSignInFrom";
import { IFormField } from "@/app/lib/definitions";
import TextInput from "../../DataInput/TextInput/TextInput";

export type SignInFormProps = {
  children: ReactNode;
};
export const SignInForm: FC<SignInFormProps> = ({ children }) => {
  const { handleSubmit, register, isPending, isError } = useSignInForm();
  return (
    <form
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      onSubmit={handleSubmit}
    >
      <TextInput
        label="Email address"
        name={IFormField.EMAIL}
        type="email"
        placeholder="example@gmail.com"
        register={register}
        required={true}
      />
      <TextInput
        label="Password"
        name={IFormField.PASSWORD}
        type="password"
        placeholder="●●●●●●●●●●"
        register={register}
        required={true}
      />
      <button className="btn btn-outline btn-primary" disabled={isPending}>
        Sign In
      </button>
      {children}
      <div className="flex justify-center items-center relative h-6">
        {isError && <ErrorMessage message="Incorrect email or password." />}
      </div>
    </form>
  );
};
