import { useMutation, useQuery } from "@tanstack/react-query";
import {
  companyControllerGetCompany,
  companyControllerGetUsersOfCompany,
  companyControllerPatchCompany,
  CompanyDto,
} from "../api/generated";
import { useForm } from "react-hook-form";
import _ from "lodash";

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
  const { register, handleSubmit, setValue } = useForm<CompanyDto>();
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

  const debouncedMutate = _.debounce((data: CompanyDto) => {
    companyMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: CompanyDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUpdate: (data: CompanyDto) => onSubmit(data),
    isPending: companyMutation.isPending,
    isError: companyMutation.isError,
    isSuccess: companyMutation.isSuccess,
    isIdle: companyMutation.isIdle,
  };
};
