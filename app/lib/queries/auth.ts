import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ROUTES } from "../constants/routes";

interface VerifyUserFormInputs {
  password: string;
  confirmPassword: string;
}

interface VerifyUserAndSetPasswordArgs {
  token: string;
  password: string;
}

export const useVerifyUserForm = (token: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    watch,
    formState: { errors },
  } = useForm<VerifyUserFormInputs>();

  const verifyUserMutation = useMutation({
    mutationFn: async (args: VerifyUserAndSetPasswordArgs) => {
      const response = await axios.patch(`/api/auth/verify/${args.token}`, {
        password: args.password,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      router.push(ROUTES.SIGN_IN);
    },
    onError: (error) => {
      console.error("Error verifying user:", error);
    },
  });

  const onSubmit = (data: VerifyUserFormInputs) => {
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    verifyUserMutation.mutate({ token, password: data.password });
  };

  return {
    register,
    unregister,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    isPending: verifyUserMutation.isPending,
    isSuccess: verifyUserMutation.isSuccess,
    isError: verifyUserMutation.isError,
  };
};

export const useGetUserByToken = (token: string) => {
  return useQuery({
    queryKey: ["userByToken", token],
    queryFn: async () => {
      const response = await axios.get(`/api/auth/user/${token}`);
      return response.data;
    },
    enabled: !!token,
  });
};
