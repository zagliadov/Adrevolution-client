import { useQuery } from "@tanstack/react-query";
import { companyControllerGetCompanyResources } from "../api/generated";

const companyResourceKey = ["companyResource"];

export const useGetCompanyResources = () => {
  return useQuery({
    queryKey: companyResourceKey,
    queryFn: companyControllerGetCompanyResources,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};
