import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  companyControllerPatchCompany,
  companyDetailsControllerPatchCompanyDetails,
} from "@/app/lib/api/generated";
import { IBusinessData } from "@/app/lib/definitions";
import { ROUTES } from "../../constants/routes";

export const useBusinessForm = () => {
  const { register, handleSubmit, setValue } = useForm<IBusinessData>();
  const router = useRouter();
  const companyMutation = useMutation({
    mutationFn: companyControllerPatchCompany,
    onSuccess: () => {},
    onError: () => {},
  });
  const companyDetailsMutation = useMutation({
    mutationFn: companyDetailsControllerPatchCompanyDetails,
    onSuccess: () => {
      router.replace(ROUTES.WELCOME_TOP_PRIORITY);
    },
  });

  const onSubmit = async (data: IBusinessData) => {
    const { companyName, teamSize, estimatedAnnualRevenue } = data;

    try {
      await companyMutation.mutateAsync({ companyName });
      await companyDetailsMutation.mutateAsync({
        teamSize,
        estimatedAnnualRevenue,
      });
      router.replace(ROUTES.WELCOME_TOP_PRIORITY);
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  return {
    isPending: companyDetailsMutation.isPending,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    companyMutation,
  };
};
