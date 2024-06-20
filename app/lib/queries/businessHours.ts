import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import queryClient from "../api/query-client";
import {
  businessHoursControllerGetBusinessHours,
  businessHoursControllerPatchBusinessHours,
  businessHoursControllerGetBusinessHoursByUserId,
  businessHoursControllerPatchBusinessHoursById,
  BusinessHoursDto,
  PatchBusinessHoursDto,
} from "../api/generated";

const businessHoursKey = ["businessHours"];

export const useGetBusinessHours = () => {
  return useQuery({
    queryKey: businessHoursKey,
    queryFn: businessHoursControllerGetBusinessHours,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const usePatchBusinessHours = () => {
  const { register, handleSubmit, setValue } = useForm<PatchBusinessHoursDto>();
  const { refetch } = useGetBusinessHours();

  const businessHoursMutation = useMutation({
    mutationFn: businessHoursControllerPatchBusinessHours,
    onMutate: async (newData: PatchBusinessHoursDto) => {
      await queryClient.cancelQueries({ queryKey: businessHoursKey });
      const previousData =
        queryClient.getQueryData<BusinessHoursDto>(businessHoursKey);
      queryClient.setQueryData<BusinessHoursDto>(
        businessHoursKey,
        (oldData) =>
          ({
            ...oldData,
            ...newData,
          } as BusinessHoursDto)
      );
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
    handleUpdate: (data: PatchBusinessHoursDto) =>
      businessHoursMutation.mutate(data),
    isPending: businessHoursMutation.isPending,
    isError: businessHoursMutation.isError,
    isSuccess: businessHoursMutation.isSuccess,
    isIdle: businessHoursMutation.isIdle,
  };
};

export const useGetBusinessHoursByUserId = (userId: string) => {
  return useQuery({
    queryKey: [...businessHoursKey, userId],
    queryFn: () => businessHoursControllerGetBusinessHoursByUserId(userId),
    enabled: !!userId,
  });
};

export const usePatchBusinessHoursById = (userId: string) => {
  const { register, handleSubmit, setValue } = useForm<PatchBusinessHoursDto>();
  const { refetch } = useGetBusinessHoursByUserId(userId);

  const businessHoursMutation = useMutation({
    mutationFn: (data: PatchBusinessHoursDto) =>
      businessHoursControllerPatchBusinessHoursById(userId, data),
    onMutate: async (newData: PatchBusinessHoursDto) => {
      await queryClient.cancelQueries({
        queryKey: [...businessHoursKey, userId],
      });
      const previousData = queryClient.getQueryData<BusinessHoursDto>([
        ...businessHoursKey,
        userId,
      ]);
      queryClient.setQueryData<BusinessHoursDto>(
        [...businessHoursKey, userId],
        (oldData) =>
          ({
            ...oldData,
            ...newData,
          } as BusinessHoursDto)
      );
      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<BusinessHoursDto>(
          [...businessHoursKey, userId],
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
    handleUpdate: (data: PatchBusinessHoursDto) =>
      businessHoursMutation.mutate(data),
    isPending: businessHoursMutation.isPending,
    isError: businessHoursMutation.isError,
    isSuccess: businessHoursMutation.isSuccess,
    isIdle: businessHoursMutation.isIdle,
  };
};

// import { useMutation, useQuery } from "@tanstack/react-query";

// import { useForm } from "react-hook-form";
// import queryClient from "../api/query-client";
// import {
//   businessHoursControllerGetBusinessHours,
//   businessHoursControllerPatchBusinessHours,
//   BusinessHoursDto,
// } from "../api/generated";

// const businessHoursKey = ["businessHours"];

// export const useGetBusinessHours = () => {
//   return useQuery({
//     queryKey: businessHoursKey,
//     queryFn: businessHoursControllerGetBusinessHours,
//     // refetchOnWindowFocus: true,
//     // refetchInterval: 60000,
//   });
// };

// export const useBusinessHoursUpdate = () => {
//   const { register, handleSubmit, setValue } = useForm<BusinessHoursDto>();
//   const { refetch } = useGetBusinessHours();

//   const businessHoursMutation = useMutation({
//     mutationFn: businessHoursControllerPatchBusinessHours,
//     onMutate: async (newData: BusinessHoursDto) => {
//       const previousData = queryClient.getQueryData<BusinessHoursDto>([
//         businessHoursKey,
//       ]);
//       queryClient.setQueryData<BusinessHoursDto>(businessHoursKey, newData);
//       return { previousData };
//     },
//     onError: (error, newData, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData<BusinessHoursDto>(
//           businessHoursKey,
//           context.previousData
//         );
//       }
//     },
//     onSuccess: () => {
//       refetch();
//     },
//     onSettled: () => {
//       refetch();
//     },
//   });

//   return {
//     register,
//     setValue,
//     handleSubmit: handleSubmit((data) => businessHoursMutation.mutate(data)),
//     handleUpdate: (data: BusinessHoursDto) =>
//       businessHoursMutation.mutate(data),
//     isPending: businessHoursMutation.isPending,
//     isError: businessHoursMutation.isError,
//     isSuccess: businessHoursMutation.isSuccess,
//     isIdle: businessHoursMutation.isIdle,
//   };
// };
