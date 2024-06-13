"use client";

import { IFormField, PERMISSION } from "@/app/lib/definitions";
import { FC, useEffect } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import { NewUserPermissionLevels } from "./NewUserPermissionLevels";

interface IProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  unregister: UseFormUnregister<any>;
}

export const NewUserPermissions: FC<IProps> = ({
  register,
  setValue,
  watch,
  unregister,
}) => {
  const isAdmin = watch(PERMISSION.IS_ADMIN);

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(PERMISSION.IS_ADMIN, e.target.checked);
  };

  useEffect(() => {
    if (isAdmin) {
      unregister(IFormField.PERMISSION_LEVEL);
    } else {
      register(IFormField.PERMISSION_LEVEL);
    }
  }, [isAdmin, register, unregister]);

  return (
    <div className="border border-base-300 rounded-md p-4 space-y-4">
      <h3 className="font-bold text-2xl">Permissions</h3>
      <div className="flex flex-col">
        <div className="form-control">
          <label className="cursor-pointer label flex justify-start gap-4">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              checked={isAdmin}
              {...register(PERMISSION.IS_ADMIN)}
              onChange={handleAdminChange}
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
      {!isAdmin && (
        <NewUserPermissionLevels
          register={register}
          setValue={setValue}
          watch={watch}
        />
      )}
    </div>
  );
};
