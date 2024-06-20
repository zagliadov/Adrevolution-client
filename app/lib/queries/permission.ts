import { useQuery, useMutation } from "@tanstack/react-query";
import {
  permissionsControllerGetPermission,
  permissionsControllerCreate,
  permissionsControllerUpdate,
  permissionsControllerDelete,
  CreatePermissionDto,
  UpdatePermissionDto,
} from "../api/generated";

const permissionKey = ["permission"];

export const useGetPermission = (userId: string) => {
  return useQuery({
    queryKey: [permissionKey, userId],
    queryFn: () => permissionsControllerGetPermission(userId),
    enabled: !!userId,
  });
};

export const useCreatePermission = () => {
  const permissionCreateMutation = useMutation({
    mutationFn: permissionsControllerCreate,
    onError: (error) => {
      console.error("Error creating permission:", error);
    },
  });

  const createPermission = (data: CreatePermissionDto) => {
    permissionCreateMutation.mutate(data);
  };

  return {
    createPermission,
    isPending: permissionCreateMutation.isPending,
    isSuccess: permissionCreateMutation.isSuccess,
    isError: permissionCreateMutation.isError,
  };
};

export const useUpdatePermission = () => {
  const permissionUpdateMutation = useMutation({
    mutationFn: (data: { id: string; dto: UpdatePermissionDto }) =>
      permissionsControllerUpdate(data.id, data.dto),
    onError: (error) => {
      console.error("Error updating permission:", error);
    },
  });

  const updatePermission = (id: string, dto: UpdatePermissionDto) => {
    permissionUpdateMutation.mutate({ id, dto });
  };

  return {
    updatePermission,
    isPending: permissionUpdateMutation.isPending,
    isSuccess: permissionUpdateMutation.isSuccess,
    isError: permissionUpdateMutation.isError,
  };
};

export const useDeletePermission = () => {
  const permissionDeleteMutation = useMutation({
    mutationFn: (id: string) => permissionsControllerDelete(id),
    onError: (error) => {
      console.error("Error deleting permission:", error);
    },
  });

  const deletePermission = (id: string) => {
    permissionDeleteMutation.mutate(id);
  };

  return {
    deletePermission,
    isPending: permissionDeleteMutation.isPending,
    isSuccess: permissionDeleteMutation.isSuccess,
    isError: permissionDeleteMutation.isError,
  };
};
