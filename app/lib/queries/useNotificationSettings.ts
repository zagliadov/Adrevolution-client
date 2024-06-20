import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import _ from "lodash";
import {
  userNotificationSettingsControllerGetUserNotificationSettings,
  userNotificationSettingsControllerUpdateUserNotificationSettings,
  UpdateUserNotificationSettingsDto,
} from "../api/generated";

const notificationSettingsKey = ["userNotificationSettings"];

export const useGetNotificationSettings = () => {
  return useQuery({
    queryKey: notificationSettingsKey,
    queryFn: userNotificationSettingsControllerGetUserNotificationSettings,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const useNotificationSettingsUpdate = () => {
  const { register, handleSubmit, setValue } =
    useForm<UpdateUserNotificationSettingsDto>();
  const { refetch } = useGetNotificationSettings();

  const notificationSettingsMutation = useMutation({
    mutationFn:
      userNotificationSettingsControllerUpdateUserNotificationSettings,
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      console.error("Error updating notification settings:", error);
    },
  });

  const debouncedMutate = _.debounce(
    (data: UpdateUserNotificationSettingsDto) => {
      notificationSettingsMutation.mutate(data);
    },
    1000
  );

  const onSubmit = (data: UpdateUserNotificationSettingsDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUpdate: (data: UpdateUserNotificationSettingsDto) => onSubmit(data),
    isPending: notificationSettingsMutation.isPending,
    isError: notificationSettingsMutation.isError,
    isSuccess: notificationSettingsMutation.isSuccess,
    isIdle: notificationSettingsMutation.isIdle,
  };
};
