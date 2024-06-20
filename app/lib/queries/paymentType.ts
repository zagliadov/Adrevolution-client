import { useMutation, useQuery } from "@tanstack/react-query";
import {
  paymentTypeControllerCreate,
  paymentTypeControllerUpdate,
  paymentTypeControllerFindByUserId,
  paymentTypeControllerDelete,
  CreatePaymentTypeDto,
  UpdatePaymentTypeDto,
  PaymentTypeDto,
} from "../api/generated";
import queryClient from "../api/query-client";

const paymentTypeKey = (userId: string) => ["paymentType", userId];

export const useGetPaymentTypeByUserId = (userId: string) => {
  return useQuery({
    queryKey: paymentTypeKey(userId),
    queryFn: () => paymentTypeControllerFindByUserId(userId),
    enabled: !!userId,
  });
};

export const useUpdatePaymentType = (userId: string) => {
  const updatePaymentTypeMutation = useMutation({
    mutationFn: (data: UpdatePaymentTypeDto) =>
      paymentTypeControllerUpdate(userId, data),
    onMutate: async (newData: UpdatePaymentTypeDto) => {
      await queryClient.cancelQueries({ queryKey: paymentTypeKey(userId) });
      const previousData = queryClient.getQueryData<PaymentTypeDto>(
        paymentTypeKey(userId)
      );
      if (previousData) {
        queryClient.setQueryData<PaymentTypeDto>(paymentTypeKey(userId), {
          ...previousData,
          ...newData,
        });
      }
      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<PaymentTypeDto>(
          paymentTypeKey(userId),
          context.previousData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentTypeKey(userId) });
    },
  });

  return {
    handleUpdate: (data: UpdatePaymentTypeDto) =>
      updatePaymentTypeMutation.mutate(data),
    isPending: updatePaymentTypeMutation.isPending,
    isSuccess: updatePaymentTypeMutation.isSuccess,
    isError: updatePaymentTypeMutation.isError,
  };
};

export const useCreatePaymentType = () => {
  const paymentTypeCreateMutation = useMutation({
    mutationFn: paymentTypeControllerCreate,
    onError: (error) => {
      console.error("Error creating payment type:", error);
    },
  });

  const createPaymentType = (data: CreatePaymentTypeDto) => {
    paymentTypeCreateMutation.mutate(data);
  };

  return {
    createPaymentType,
    isPending: paymentTypeCreateMutation.isPending,
    isSuccess: paymentTypeCreateMutation.isSuccess,
    isError: paymentTypeCreateMutation.isError,
  };
};

export const useDeletePaymentType = () => {
  const paymentTypeDeleteMutation = useMutation({
    mutationFn: (userId: string) => paymentTypeControllerDelete(userId),
    onError: (error) => {
      console.error("Error deleting payment type:", error);
    },
  });

  const deletePaymentType = (userId: string) => {
    paymentTypeDeleteMutation.mutate(userId);
  };

  return {
    deletePaymentType,
    isPending: paymentTypeDeleteMutation.isPending,
    isSuccess: paymentTypeDeleteMutation.isSuccess,
    isError: paymentTypeDeleteMutation.isError,
  };
};
