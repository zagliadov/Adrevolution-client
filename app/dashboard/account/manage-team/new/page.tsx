"use client";
import { ROUTES } from "@/app/lib/constants/routes";
import { IFormField } from "@/app/lib/definitions";
import { useGetCompany } from "@/app/lib/queries/company";
import {
  useCreateUserWithoutPassword,
  useGetUserDetails,
} from "@/app/lib/queries/user";
import { NewUserCommunication } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/Communications/NewUserCommunication";
import { NewUserLabourCost } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/LabourCost/NewUserLabourCost";
import { NewUserPermissions } from "@/app/ui/dashboard/ManageTeam/PersonalInfo/Permissions/NewUserPermissions";
import TextInput from "@/app/ui/DataInput/TextInput/TextInput";
import { ErrorMessage } from "@/app/ui/ErrorMessage/ErrorMessage";
import { Spinner } from "@/app/ui/spinner";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";

export default function NewUser() {
  const { register, setValue, watch, handleSubmit, unregister, isError } =
    useCreateUserWithoutPassword();
  const { data: company } = useGetCompany();
  const { data: userDetails, isSuccess: userDetailsIsSuccess } =
    useGetUserDetails();
  useEffect(() => {
    if (company) {
      setValue(IFormField.COMPANY_ID, company?.id);
    }
    if (userDetailsIsSuccess) {
      setValue(IFormField.INVITER_FIRST_NAME, userDetails?.firstName);
      setValue(IFormField.INVITER_LAST_NAME, userDetails?.lastName);
    }
  }, [
    setValue,
    company,
    userDetailsIsSuccess,
    userDetails?.firstName,
    userDetails?.lastName,
  ]);
  return (
    <div className="px-4 space-y-4 max-w-5xl">
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
        <h2 className="font-bold text-4xl">New User</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border border-base-300 rounded-md p-4 space-y-4"
      >
        <h3 className="font-bold text-2xl">Personal Info</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 border rounded-full bg-base-200 flex items-center justify-center">
            <span className="text-3xl font-bold text-neutral">N</span>
          </div>
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
        <div className="divider"></div>
        <NewUserLabourCost
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <div className="divider"></div>
        <NewUserPermissions
          register={register}
          setValue={setValue}
          watch={watch}
          unregister={unregister}
        />
        <div className="divider"></div>
        <NewUserCommunication register={register} watch={watch} />
        <div className="divider"></div>
        <div className="flex justify-end">
          <button className="btn btn-success" type="submit">
            {false ? (
              <Spinner className="text-primary w-6 h-6" />
            ) : (
              "Update Settings"
            )}
          </button>
          <div className="flex justify-center items-center relative h-6">
        {isError && <ErrorMessage message="Incorrect email or password." />}
      </div>
        </div>
      </form>
    </div>
  );
}

// const handleCreateNewUser = (data: any) => {
//   const {
//     labourCost,
//     costUnit,
//     //
//     surveys,
//     //
//     isAdmin,
//     permissionLevel,
//     ...other
//   } = data;

//   console.log(data);
// };
