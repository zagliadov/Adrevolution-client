import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import queryClient from "../api/query-client";
import {
  userPositionControllerCreate,
  userPositionControllerUpdate,
  userPositionControllerDelete,
  userPositionControllerAssignUserToPosition,
  CreatePositionDto,
  UpdatePositionDto,
  PositionDto,
  AssignUserToPositionDto,
  userPositionControllerGetUserPosition,
  userPositionControllerGetPositionByPositionId,
} from "../api/generated";

const positionKey = ["userPosition"];
const positionDetailKey = (id: string) => [...positionKey, id];

export const useGetUserPosition = () => {
  return useQuery({
    queryKey: positionKey,
    queryFn: userPositionControllerGetUserPosition,
  });
};

export const useGetUserPositionByPositionId = (positionId: string) => {
  return useQuery({
    queryKey: positionDetailKey(positionId),
    queryFn: () => userPositionControllerGetPositionByPositionId(positionId),
    enabled: !!positionId,
  });
};

export const useCreateUserPosition = () => {
  const { register, handleSubmit, setValue } = useForm<CreatePositionDto>();
  const createPositionMutation = useMutation({
    mutationFn: userPositionControllerCreate,
    onMutate: async (newData: CreatePositionDto) => {
      await queryClient.cancelQueries({ queryKey: positionKey });
      const previousData = queryClient.getQueryData<PositionDto[]>(positionKey);
      queryClient.setQueryData<PositionDto[]>(positionKey, (oldData) => [
        ...(oldData || []),
        { ...newData, id: `temp-${new Date().toISOString()}` } as PositionDto,
      ]);
      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<PositionDto[]>(
          positionKey,
          context.previousData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionKey });
    },
  });

  const onSubmit = (data: CreatePositionDto) => {
    createPositionMutation.mutate(data);
  };

  return {
    register,
    setValue,
    handleSubmit: handleSubmit(onSubmit),
    isPending: createPositionMutation.isPending,
    isSuccess: createPositionMutation.isSuccess,
    isError: createPositionMutation.isError,
  };
};

export const useUpdateUserPosition = (positionId: string) => {
  const { register, handleSubmit, setValue } = useForm<UpdatePositionDto>();
  const updatePositionMutation = useMutation({
    mutationFn: (data: UpdatePositionDto) =>
      userPositionControllerUpdate(positionId, data),
    onMutate: async (newData: UpdatePositionDto) => {
      await queryClient.cancelQueries({
        queryKey: positionDetailKey(positionId),
      });
      const previousData = queryClient.getQueryData<PositionDto[]>(
        positionDetailKey(positionId)
      );
      queryClient.setQueryData<PositionDto[]>(
        positionDetailKey(positionId),
        (oldData) =>
          oldData?.map((item) =>
            item.id === positionId ? { ...item, ...newData } : item
          )
      );
      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<PositionDto[]>(
          positionDetailKey(positionId),
          context.previousData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: positionDetailKey(positionId),
      });
    },
  });

  const onSubmit = (data: UpdatePositionDto) => {
    updatePositionMutation.mutate(data);
  };

  return {
    register,
    setValue,
    handleSubmit: handleSubmit(onSubmit),
    isPending: updatePositionMutation.isPending,
    isSuccess: updatePositionMutation.isSuccess,
    isError: updatePositionMutation.isError,
  };
};

export const useDeleteUserPosition = (positionId: string) => {
  const deletePositionMutation = useMutation({
    mutationFn: () => userPositionControllerDelete(positionId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: positionDetailKey(positionId),
      });
      const previousData = queryClient.getQueryData<PositionDto[]>(
        positionDetailKey(positionId)
      );
      queryClient.setQueryData<PositionDto[]>(
        positionDetailKey(positionId),
        (oldData) => oldData?.filter((item) => item.id !== positionId)
      );
      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<PositionDto[]>(
          positionDetailKey(positionId),
          context.previousData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionKey });
    },
  });

  return {
    deletePosition: () => deletePositionMutation.mutate(),
    isPending: deletePositionMutation.isPending,
    isSuccess: deletePositionMutation.isSuccess,
    isError: deletePositionMutation.isError,
  };
};

export const useAssignUserToPosition = () => {
  const { register, handleSubmit, setValue } =
    useForm<AssignUserToPositionDto>();
  const assignUserMutation = useMutation({
    mutationFn: userPositionControllerAssignUserToPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionKey });
    },
    onError: (error) => {
      console.error("Error assigning user to position:", error);
    },
  });

  const onSubmit = (data: AssignUserToPositionDto) => {
    assignUserMutation.mutate(data);
  };

  return {
    register,
    setValue,
    handleSubmit: handleSubmit(onSubmit),
    isPending: assignUserMutation.isPending,
    isSuccess: assignUserMutation.isSuccess,
    isError: assignUserMutation.isError,
  };
};
