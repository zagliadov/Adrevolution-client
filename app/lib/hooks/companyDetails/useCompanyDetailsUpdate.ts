import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  companyDetailsControllerPatchCompanyDetails,
  CompanyDetailsDto,
} from "@/app/lib/api/generated";
import { useGetCompanyDetails } from "../../queries/companyDetails";
import _ from "lodash";

export const useCompanyDetailsUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<CompanyDetailsDto>();
  const { refetch } = useGetCompanyDetails();

  const companyDetailsMutation = useMutation({
    mutationFn: companyDetailsControllerPatchCompanyDetails,
    onSuccess: () => {
      refetch();
    },
  });

  const debouncedMutate = _.debounce((data: CompanyDetailsDto) => {
    companyDetailsMutation.mutate(data);
  }, 1000);

  const onSubmit = (data: CompanyDetailsDto) => {
    debouncedMutate(data);
  };

  return {
    setValue,
    register,
    handleSubmit: handleSubmit((data) => onSubmit(data)),
    handleUpdate: (data: CompanyDetailsDto) => onSubmit(data),
    isPending: companyDetailsMutation.isPending,
    isError: companyDetailsMutation.isError,
    isSuccess: companyDetailsMutation.isSuccess,
    isIdle: companyDetailsMutation.isIdle,
  };
};
