import { useQuery } from "@tanstack/react-query";
import { companyControllerGetCompanyOrders } from "../api/generated";

const companyOrderKey = ["companyOrder"];

export const useGetCompanyOrders = () => {
  return useQuery({
    queryKey: companyOrderKey,
    queryFn: companyControllerGetCompanyOrders,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};
