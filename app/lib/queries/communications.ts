import { useMutation, useQuery } from "@tanstack/react-query";
import {
  communicationsControllerGetCommunications,
  communicationsControllerUpdateCommunications,
  UpdateCommunicationDto,
} from "../api/generated";
import { useForm } from "react-hook-form";
import _ from "lodash";

const communicationsKey = ["communications"];

export const useGetCommunications = () => {
  return useQuery({
    queryKey: communicationsKey,
    queryFn: communicationsControllerGetCommunications,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const useCompanyUpdate = () => {
  const { register, handleSubmit, setValue } =
    useForm<UpdateCommunicationDto>();
  const { refetch } = useGetCommunications();

  const companyMutation = useMutation({
    mutationFn: communicationsControllerUpdateCommunications,
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      console.error("Error updating company:", error);
    },
  });

  const debouncedMutate = _.debounce((data: UpdateCommunicationDto) => {
    companyMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: UpdateCommunicationDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUpdate: (data: UpdateCommunicationDto) => onSubmit(data),
    isPending: companyMutation.isPending,
    isError: companyMutation.isError,
    isSuccess: companyMutation.isSuccess,
    isIdle: companyMutation.isIdle,
  };
};
