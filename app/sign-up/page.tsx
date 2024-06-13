"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { SignUpForm } from "../ui/auth/SignUpForm/SignUpForm";
import Link from "next/link";
import { UiAuthPageLayout } from "../ui/Layout/AuthLayout";

const SignUpPage: FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <UiAuthPageLayout
      title={"Sign Up"}
      description={"Create an account with your email and password"}
    >
      <SignUpForm email={email || ""}>
        <p className="text-center text-sm text-gray-600">
          {"Already have an account? "}
          <Link href="/sign-in" className="font-semibold text-gray-800">
            Sign in
          </Link>
          {" instead."}
        </p>
      </SignUpForm>
    </UiAuthPageLayout>
  );
};

export default SignUpPage;
