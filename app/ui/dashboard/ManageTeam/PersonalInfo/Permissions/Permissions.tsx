"use client";

import { PermissionDto } from "@/app/lib/api/generated";
import { PERMISSION_LEVEL } from "@/app/lib/definitions";
import { FC } from "react";

interface IProps {
  userPermission: PermissionDto | undefined;
  userPermissionIsSuccess: boolean;
}

export const Permissions: FC<IProps> = ({
  userPermission,
  userPermissionIsSuccess,
}) => {
  if (!userPermissionIsSuccess) return null;

  const isCompanyOwner =
    userPermission?.isOwner &&
    userPermission?.level === PERMISSION_LEVEL.COMPANY_OWNER;
  const isAdmin = userPermission?.isAdmin;
  const permissionLevel = userPermission?.level;

  return (
    <div className="border border-base-300 rounded-md p-4 space-y-4">
      <h3 className="font-bold text-2xl">Permissions</h3>
      {isCompanyOwner && (
        <div className="flex flex-col">
          <p className="text-lg">
            You are the Company Owner. You have the highest level of
            permissions.
          </p>
          <div className="form-control">
            <label className="cursor-pointer label flex justify-start gap-4">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-success"
                disabled
              />
              <span className="label-text text-neutral cursor-default">
                Make administrator
              </span>
            </label>
          </div>
          <span className="label-text text-neutral">
            Account owners are administrators with full permissions. Adjust
            permissions by transferring account ownership to another
            administrator.
          </span>
        </div>
      )}
      {isAdmin && !isCompanyOwner && (
        <p className="text-lg">
          You are an Admin. You have administrative permissions.
        </p>
      )}
      {!isAdmin && permissionLevel && (
        <p className="text-lg">
          Your permission level is:{" "}
          {permissionLevel
            .replace("_", " ")
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          .
        </p>
      )}
      {!isCompanyOwner && !isAdmin && !permissionLevel && (
        <p className="text-lg">You have limited permissions.</p>
      )}
    </div>
  );
};
