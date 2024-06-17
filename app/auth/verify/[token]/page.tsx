"use client";

import { useVerifyUserForm, useGetUserByToken } from "@/app/lib/queries/auth";

const VerifyTokenPage = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const { register, handleSubmit, errors, isPending, isSuccess, isError } =
    useVerifyUserForm(token);
  const { data: user, isLoading } = useGetUserByToken(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Hello, {user.firstName}</h1>
        <p className="mb-6">
          You have received an invitation to join the {user.companyName} team on
          Adrevolution platform.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label htmlFor="email" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              type="email"
              id="email"
              defaultValue={user.email}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control mb-4">
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="input input-bordered"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending}
          >
            Join Now
          </button>
        </form>
        {isError && (
          <p className="text-red-500 text-center mt-4">Error verifying user.</p>
        )}
        {isSuccess && (
          <p className="text-green-500 text-center mt-4">
            Password set successfully!
          </p>
        )}
        <p className="text-center mt-6">
          By creating an account you are agreeing to our{" "}
          <a href="/terms" className="text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 ml-10">
        <h2 className="text-xl font-bold mb-2">What`s Adrevolution?</h2>
        <p className="mb-4">
          Adrevolution is a powerful platform designed to help businesses with
          advertising, campaign management, and performance tracking.
        </p>
        <h2 className="text-xl font-bold mb-2">
          Why am I getting this invite?
        </h2>
        <p>
          {user.companyName} uses Adrevolution to manage their advertising
          campaigns and you`ve been invited to join their team.
        </p>
      </div>
    </div>
  );
};

export default VerifyTokenPage;
