"use client";

import { PermissionDto, PositionDto } from "@/app/lib/api/generated";
import { PERMISSION_LEVEL } from "@/app/lib/definitions";
import { FC } from "react";

interface IProps {
  userPosition: PositionDto | undefined;
  userPositionIsSuccess: boolean;
}

export const Permissions: FC<IProps> = ({
  userPosition,
  userPositionIsSuccess,
}) => {
  if (!userPositionIsSuccess) return null;

  console.log(userPosition, "userPositino")
  // const isAdmin = userPosition?.isAdmin;
  // const permissionLevel =
  //   userPermission?.userPositionId as keyof typeof PERMISSION_LEVEL;

  // const isCompanyOwner = permissionLevel === PERMISSION_LEVEL.COMPANY_OWNER;

  return (
    <div className="border border-base-300 rounded-md p-4 space-y-4">
      <h3 className="font-bold text-2xl">Permissions</h3>
      {/* {isCompanyOwner && (
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
      )} */}
    </div>
  );
};
