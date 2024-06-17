import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import _ from "lodash";
import {
  companyControllerGetCompany,
  companyControllerGetUsersOfCompany,
  companyControllerPatchCompany,
  CompanyDto,
  PatchCompanyDto,
  UserDto,
} from "../api/generated";

const companyKey = ["company"];
const usersOfCompanyKey = ["usersOfCompany"];

export const useGetCompany = () => {
  return useQuery({
    queryKey: companyKey,
    queryFn: companyControllerGetCompany,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const useGetUsersOfCompany = () => {
  return useQuery({
    queryKey: usersOfCompanyKey,
    queryFn: companyControllerGetUsersOfCompany,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};

export const useCompanyUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<PatchCompanyDto>();
  const { refetch } = useGetCompany();

  const companyMutation = useMutation({
    mutationFn: companyControllerPatchCompany,
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      console.error("Error updating company:", error);
    },
  });

  const debouncedMutate = _.debounce((data: PatchCompanyDto) => {
    companyMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: PatchCompanyDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUpdate: (data: PatchCompanyDto) => onSubmit(data),
    isPending: companyMutation.isPending,
    isError: companyMutation.isError,
    isSuccess: companyMutation.isSuccess,
    isIdle: companyMutation.isIdle,
  };
};
