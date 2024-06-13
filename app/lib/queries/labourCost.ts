import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    labourCostControllerFindByUserId,
  labourCostControllerUpdate,
  UpdateLabourCostDto,
} from "../api/generated";
import { useForm } from "react-hook-form";
import _ from "lodash";

const labourCostKey = ["labourCost"];

export const useLabourCostFindByUserId = (userId: string) => {
  return useQuery({
    queryKey: [labourCostKey, userId],
    queryFn: () => labourCostControllerFindByUserId(userId),
    enabled: !!userId,
  });
};

export const useLabourCostUpdate = (userId: string) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue } = useForm<UpdateLabourCostDto>();

  const labourCostMutation = useMutation({
    mutationFn: (data: UpdateLabourCostDto) =>
      labourCostControllerUpdate(userId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [labourCostKey, userId],
      });
    },
    onError: (error) => {
      console.error("Error updating labour cost:", error);
    },
  });

  const debouncedMutate = _.debounce((data: UpdateLabourCostDto) => {
    labourCostMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: UpdateLabourCostDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUpdate: (data: UpdateLabourCostDto) => onSubmit(data),
    isPending: labourCostMutation.isPending,
    isError: labourCostMutation.isError,
    isSuccess: labourCostMutation.isSuccess,
    isIdle: labourCostMutation.isIdle,
  };
};
