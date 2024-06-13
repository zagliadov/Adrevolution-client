import { useQuery } from "@tanstack/react-query";
import { companyDetailsControllerGetCompanyDetails } from "../api/generated";

const companyDetailsKey = ["companyDetails"];

export const useGetCompanyDetails = () => {
  return useQuery({
    queryKey: companyDetailsKey,
    queryFn: companyDetailsControllerGetCompanyDetails,
  });
};
