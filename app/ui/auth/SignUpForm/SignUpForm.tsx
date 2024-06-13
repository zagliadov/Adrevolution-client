"use client";

import { FC, ReactNode, useEffect } from "react";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import { IFormField } from "@/app/lib/definitions";
import { useSignUpForm } from "@/app/lib/hooks/auth/useSignUpForm";
import TextInput from "../../DataInput/TextInput/TextInput";

export type SignUpFormProps = {
  email?: string;
  children: ReactNode;
};
export const SignUpForm: FC<SignUpFormProps> = ({ email, children }) => {
  const { setValue, handleSubmit, register, isPending, isError } =
    useSignUpForm();

  useEffect(() => {
    if (email) {
      setValue(IFormField.EMAIL, email);
    }
  }, [email, setValue]);

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
        Sign Up
      </button>
      {children}
      <div className="flex justify-center items-center relative h-6">
        {isError && (
          <ErrorMessage message="A user with this email already exists." />
        )}
      </div>
    </form>
  );
};
