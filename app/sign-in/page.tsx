import { FC } from "react";
import Link from "next/link";
import { UiAuthPageLayout } from "../ui/Layout/AuthLayout";
import { SignInForm } from "../ui/auth/SignInForm/SignInForm";

const SignInPage: FC = () => {
  return (
    <UiAuthPageLayout
      title={"Sign In"}
      description={"Use your email and password to sign in"}
    >
      <SignInForm>
        <p className="text-center text-sm text-gray-600">
          {"Don't have an account? "}
          <Link href="/sign-up" className="font-semibold text-gray-800">
            Sign up
          </Link>
          {" for free."}
        </p>
      </SignInForm>
    </UiAuthPageLayout>
  );
};

export default SignInPage;
