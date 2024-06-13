import { useQuery } from "@tanstack/react-query";
import { permissionsControllerGetPermission } from "../api/generated";

const permissionKey = ["permission"];

export const useGetPermission = () => {
  return useQuery({
    queryKey: permissionKey,
    queryFn: permissionsControllerGetPermission,
    // refetchOnWindowFocus: true,
    // refetchInterval: 60000,
  });
};
