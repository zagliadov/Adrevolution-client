"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetUsersOfCompany } from "@/app/lib/queries/company";
import { ROUTES } from "@/app/lib/constants/routes";
import { formatEnglishDate } from "@/app/lib/helpers";
import _ from "lodash";
import { IFormField } from "@/app/lib/definitions";
import { useGetCompanyResources } from "@/app/lib/queries/resources";

export const TeamTable: FC = () => {
  const { data: companyUsers, isLoading, error } = useGetUsersOfCompany();
  const { data: resources } = useGetCompanyResources();
  console.log(resources, "resources")
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="overflow-x-auto pb-4 2xl:order-1 order-2 2xl:w-4/5 border p-2 border-base-300 rounded-md">
      <table className="hidden md:table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {_.map(companyUsers, (user) => {
            const id = _.get(user, IFormField.ID, "");
            const firstName = _.get(user, IFormField.FIRST_NAME, "");
            const lastName = _.get(user, IFormField.LAST_NAME, "");
            const email = _.get(user, IFormField.EMAIL, "");
            const lastLogin = _.get(user, IFormField.LAST_LOGIN, "");
            return (
              <tr key={id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src="/photo.jpg"
                          alt="User Avatar"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {firstName} {lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{email}</td>
                <td>{formatEnglishDate(lastLogin)}</td>
                <th>
                  <Link href={`${ROUTES.MANAGE_TEAM}/${id}`}>
                    <button className="btn btn-ghost btn-xs" type="button">details</button>
                  </Link>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col space-y-2 md:hidden rounded-md">
        {_.map(companyUsers, (user) => {
          const id = _.get(user, IFormField.ID, "");
          const firstName = _.get(user, IFormField.FIRST_NAME, "");
          const lastName = _.get(user, IFormField.LAST_NAME, "");
          const email = _.get(user, IFormField.EMAIL, "");
          const lastLogin = _.get(user, IFormField.LAST_LOGIN, "");
          return (
            <div className="flex flex-col gap-3 w-full p-4 border border-base-300 rounded-md hover:bg-base-200">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="/photo.jpg"
                      alt="User Avatar"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link
                    href={`${ROUTES.MANAGE_TEAM}/${id}`}
                    className="font-bold text-success"
                  >
                    {firstName} {lastName}
                  </Link>
                  <span className="text-neutral">Account owner</span>
                </div>
              </div>
              <div className="flex w-full justify-between border-b border-b-base-300 pb-3">
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className=" flex w-full justify-between">
                <span>Last Login</span>
                <span>{formatEnglishDate(lastLogin)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
