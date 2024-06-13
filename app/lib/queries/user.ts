import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UserDto,
  usersControllerCreateUserWithoutPassword,
  usersControllerGetUserById,
  usersControllerGetUserDetails,
  usersControllerPatchUser,
} from "../api/generated";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";

const userKey = ["user"];
const userByIdKey = ["userById"];

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: userKey,
    queryFn: usersControllerGetUserDetails,
  });
};

export const useCreateUserWithoutPassword = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, unregister, watch } =
    useForm<any>();

  const newUserCreateMutation = useMutation({
    mutationFn: usersControllerCreateUserWithoutPassword,
    onSuccess: async () => {
      router.push(ROUTES.MANAGE_TEAM);
    },
    onError: (error) => {
      console.error("Error user create:", error);
    },
  });

  return {
    register,
    unregister,
    watch,
    handleSubmit: handleSubmit((data) => {
      newUserCreateMutation.mutate(data);
    }),
    setValue,
    isPending: newUserCreateMutation.isPending,
    isSuccess: newUserCreateMutation.isSuccess,
    isError: newUserCreateMutation.isError,
  };
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [userByIdKey, userId],
    queryFn: () => usersControllerGetUserById(userId),
    enabled: !!userId,
  });
};

export const useUserUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<UserDto>();
  const { refetch } = useGetUserDetails();

  const userMutation = useMutation({
    mutationFn: usersControllerPatchUser,
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      console.error("Error user update:", error);
    },
  });

  const debouncedMutate = _.debounce((data: UserDto) => {
    userMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: UserDto) => {
    debouncedMutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    isPending: userMutation.isPending,
    isSuccess: userMutation.isSuccess,
    isError: userMutation.isError,
  };
};