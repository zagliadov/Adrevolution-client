import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import queryClient from "../api/query-client";
import { businessHoursControllerGetBusinessHours, businessHoursControllerPatchBusinessHours, BusinessHoursDto } from "../api/generated";

const businessHoursKey = ["businessHours"];

export const useGetBusinessHours = () => {
  return useQuery({
    queryKey: businessHoursKey,
    queryFn: businessHoursControllerGetBusinessHours,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const useBusinessHoursUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<BusinessHoursDto>();
  const { refetch } = useGetBusinessHours();

  const businessHoursMutation = useMutation({
    mutationFn: businessHoursControllerPatchBusinessHours,
    onMutate: async (newData: BusinessHoursDto) => {
      const previousData = queryClient.getQueryData<BusinessHoursDto>([
        businessHoursKey,
      ]);
      queryClient.setQueryData<BusinessHoursDto>(businessHoursKey, newData);
      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<BusinessHoursDto>(
          businessHoursKey,
          context.previousData
        );
      }
    },
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      refetch();
    },
  });

  return {
    register,
    setValue,
    handleSubmit: handleSubmit((data) => businessHoursMutation.mutate(data)),
    handleUpdate: (data: BusinessHoursDto) =>
      businessHoursMutation.mutate(data),
    isPending: businessHoursMutation.isPending,
    isError: businessHoursMutation.isError,
    isSuccess: businessHoursMutation.isSuccess,
    isIdle: businessHoursMutation.isIdle,
  };
};
