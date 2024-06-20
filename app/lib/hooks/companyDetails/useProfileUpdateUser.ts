import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ROUTES } from "../../constants/routes";
import {
  companyControllerPatchCompany,
  usersControllerPatchUser,
} from "../../api/generated";

/**
 * Custom hook to handle user and company updates.
 *
 * This hook uses `react-hook-form` to handle form submissions and `react-query` to manage mutations.
 * It updates user data and then company data upon form submission.
 *
 * @returns {object} - Returns an object containing methods and states for form handling and mutations.
 */
export const useProfileUpdateUser = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<any>();

  /**
   * Mutation for updating user data.
   */
  const userMutation = useMutation({
    mutationFn: usersControllerPatchUser,
    onSuccess() {
      // Additional actions can be performed here after successful user update if needed
    },
  });

  /**
   * Mutation for updating company data.
   */
  const companyModelMutation = useMutation({
    mutationFn: companyControllerPatchCompany,
    onSuccess: () => {
      // Replaces current route with the welcome business route upon successful company update
      router.replace(ROUTES.WELCOME_BUSINESS);
    },
  });

  /**
   * Handles form submission.
   *
   * @param {object} data - The form data containing user and company fields.
   */
  const handleFormSubmit = ({
    firstName,
    lastName,
    phoneNumber,
    industry,
  }: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    industry: string;
  }) => {
    // const { firstName, lastName, phoneNumber, industry } = data;

    userMutation.mutate(
      { firstName, lastName },
      {
        onSuccess: () => {
          // Mutates company data after successful user update
          companyModelMutation.mutate({
            phoneNumber,
            industry,
          });
        },
      }
    );
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    isPending: userMutation.isPending || companyModelMutation.isPending,
    isError: userMutation.isError || companyModelMutation.isError,
    isSuccess: userMutation.isSuccess && companyModelMutation.isSuccess,
    isIdle: userMutation.isIdle && companyModelMutation.isIdle,
  };
};
