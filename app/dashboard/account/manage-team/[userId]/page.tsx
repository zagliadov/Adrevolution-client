"use client";

import { ROUTES } from "@/app/lib/constants/routes";
import { useGetPermission } from "@/app/lib/queries/permission";
import { useGetUserById, useUserUpdate } from "@/app/lib/queries/user";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import TextInput from "@/app/ui/DataInput/TextInput/TextInput";
import { IFormField } from "@/app/lib/definitions";
import { Spinner } from "@/app/ui/spinner";
import { ChangePasswordModal } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/ChangePasswordModal/ChangePasswordModal";
import { LabourCost } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/PaymentType/PaymentType";
import { useEffect } from "react";
import { BusinessHoursEdit } from "@/app/ui/dashboard/Account/CompanySettingsForm/BusinessHoursEdit";
import { Permissions } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/Permissions/Permissions";
import { UserNotificationSettings } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/UserNotificationSettings/UserNotificationSettings";
import { useGetUserPosition } from "@/app/lib/queries/userPosition";

type Params = {
  params: {
    userId: string;
  };
};
export default function UserId({ params }: Params) {
  const { data: userPermission, isSuccess: userPermissionIsSuccess } =
    useGetPermission(params.userId);

  const { data: userPosition, isSuccess: userPositionIsSuccess } = useGetUserPosition();
  const { data: userById } = useGetUserById(params.userId);
  const { register, setValue, handleSubmit, isPending } = useUserUpdate();
  useEffect(() => {
    if (userById) {
      if (userById) {
        setValue(IFormField.FIRST_NAME, userById[IFormField.FIRST_NAME]);
        setValue(IFormField.LAST_NAME, userById[IFormField.LAST_NAME]);
        setValue(IFormField.EMAIL, userById[IFormField.EMAIL]);
        setValue(IFormField.PHONE_NUMBER, userById[IFormField.PHONE_NUMBER]);
        setValue(
          IFormField.STREET_ADDRESS,
          userById[IFormField.STREET_ADDRESS]
        );
        setValue(IFormField.CITY, userById[IFormField.CITY]);
        setValue(IFormField.PROVINCE, userById[IFormField.PROVINCE]);
        setValue(IFormField.POSTAL_CODE, userById[IFormField.POSTAL_CODE]);
        setValue(IFormField.COUNTRY, userById[IFormField.COUNTRY]);
      }
    }
  }, [setValue, userById]);

  const userId = _.get(params, "userId");
  const firstName = _.get(userById, "firstName");
  const lastName = _.get(userById, "lastName");
  const userImage = _.get(userById, "userImage", "");

  const fullName = `${firstName} ${lastName}`;
  const firstLetter = firstName && firstName.charAt(0);

  const handleUpdateData = (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.MANAGE_TEAM}
          className="text-success flex items-center gap-2"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Manage Team</span>
        </Link>
      </div>
      <div>
        <h2 className="font-bold text-4xl">{fullName}</h2>
      </div>
      <form
        className="border border-base-300 rounded-md p-4 space-y-4"
        onSubmit={handleUpdateData}
      >
        <h3 className="font-bold text-2xl">Personal Info</h3>
        <div className="flex items-center gap-4">
          {userImage ? (
            <Image
              src={userImage}
              alt="User Image"
              width={80}
              height={80}
              className="border rounded-full bg-base-200"
            />
          ) : (
            <div className="w-20 h-20 border rounded-full bg-base-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-neutral">
                {firstLetter}
              </span>
            </div>
          )}
          <button className="btn btn-success btn-outline" type="button">
            Upload Image
          </button>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row justify-between">
          <div className="border border-base-300 rounded-md p-2 w-full">
            <TextInput
              label="First Name"
              name={IFormField.FIRST_NAME}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <TextInput
              label="Last Name"
              name={IFormField.LAST_NAME}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <TextInput
              label="Email address"
              name={IFormField.EMAIL}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <TextInput
              label="Mobile phone number (if applicable)"
              name={IFormField.PHONE_NUMBER}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
          </div>
          <div className="border border-base-300 rounded-md p-2">
            <TextInput
              label="Street address"
              name={IFormField.STREET_ADDRESS}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <TextInput
              label="City"
              name={IFormField.CITY}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <TextInput
              label="Province"
              name={IFormField.PROVINCE}
              type="text"
              placeholder="Type here..."
              register={register}
              containerClassName="w-full"
              labelClassName=""
              inputClassName="input input-bordered text-primary w-full"
            />
            <div className="flex gap-2">
              <TextInput
                label="Postal code"
                name={IFormField.POSTAL_CODE}
                type="text"
                placeholder="Type here..."
                register={register}
                containerClassName="w-full"
                labelClassName=""
                inputClassName="input input-bordered text-primary w-full"
              />
              <TextInput
                label="Country"
                name={IFormField.COUNTRY}
                type="text"
                placeholder="Type here..."
                register={register}
                containerClassName="w-full"
                labelClassName=""
                inputClassName="input input-bordered text-primary w-full"
              />
            </div>
          </div>
        </div>

        <ChangePasswordModal />
        <LabourCost userId={userId} />
        <div className="divider"></div>
        <BusinessHoursEdit
          heading={"Availability for online booking"}
          description={`Availability is only applied to online booking, currently. Set team member's availability so that they are only bookable when they are available.`}
        />
        <div className="divider"></div>
        <Permissions
          userPosition={userPosition}
          userPositionIsSuccess={userPositionIsSuccess}
        />
        <div className="divider"></div>
        <UserNotificationSettings />
        <div className="divider"></div>
        <div className="flex justify-end">
          <button className="btn btn-success">
            {isPending ? (
              <Spinner className="text-primary w-6 h-6" />
            ) : (
              "Update Settings"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
