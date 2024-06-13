import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ROUTES } from "../../constants/routes";
import { ISignInData } from "../../definitions";
import { authControllerSignIn } from "../../api/generated";

/**
 * Custom hook for handling the sign-in form.
 * Provides form handling and mutation states.
 *
 * @returns {Object} Object containing methods and states for the sign-in form.
 * @property {Function} register - Function to register form inputs.
 * @property {Function} handleSubmit - Function to handle form submission.
 * @property {boolean} isPending - Indicates if the sign-in mutation is pending.
 * @property {boolean} isError - Indicates if there was an error during the sign-in mutation.
 * @property {boolean} isSuccess - Indicates if the sign-in mutation was successful.
 * @property {boolean} isIdle - Indicates if the sign-in mutation is idle.
 */
export const useSignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignInData>();

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess() {
      router.push(ROUTES.HOME);
    },
  });

  return {
    register,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isPending: signInMutation.isPending,
    isError: signInMutation.isError,
    isSuccess: signInMutation.isSuccess,
    isIdle: signInMutation.isIdle,
  };
};
