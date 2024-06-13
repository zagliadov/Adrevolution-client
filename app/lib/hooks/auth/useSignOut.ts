import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../constants/routes";
import { authControllerSignOut } from "../../api/generated";
import { useResetSession } from "../../queries/session";

/**
 * Custom hook for handling sign-out functionality.
 * Provides mutation state and function to trigger sign-out.
 *
 * @returns {Object} Object containing methods and states for the sign-out functionality.
 * @property {Function} signOut - Function to trigger sign-out.
 * @property {boolean} isPending - Indicates if the sign-out mutation is pending.
 * @property {boolean} isError - Indicates if there was an error during the sign-out mutation.
 * @property {boolean} isSuccess - Indicates if the sign-out mutation was successful.
 * @property {boolean} isIdle - Indicates if the sign-out mutation is idle.
 */
export const useSignOut = () => {
  const router = useRouter();
  const resetSession = useResetSession();

  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    async onSuccess() {
      router.push(ROUTES.SIGN_IN);
      resetSession();
    },
  });

  return {
    signOut: signOutMutation.mutate,
    isPending: signOutMutation.isPending,
    isError: signOutMutation.isError,
    isSuccess: signOutMutation.isSuccess,
    isIdle: signOutMutation.isIdle,
  };
};
