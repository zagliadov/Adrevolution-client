import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isPending?: boolean;
  className?: string;
}
export const SuccessButton: FC<IProps> = ({
  children,
  isPending,
  className = "btn-success text-xl text-white w-full max-w-xs",
}) => {
  return (
    <button
      className={`btn ${className}`}
      disabled={isPending}
    >
      {children}
    </button>
  );
};
