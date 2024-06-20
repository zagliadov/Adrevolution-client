"use client";

import { FC, useEffect } from "react";
import { IFormField } from "@/app/lib/definitions";
import TextInput from "@/app/ui/DataInput/TextInput/TextInput";
import _ from "lodash";
import { useCompanyUpdate, useGetCompany } from "@/app/lib/queries/company";
import { CompanyDto } from "@/app/lib/api/generated";
import { Spinner } from "@/app/ui/spinner";
import { BusinessHoursEdit } from "./BusinessHoursEdit";

const initializeCompanyData = (data: CompanyDto, setValue: Function) => {
  setValue(IFormField.COMPANY_NAME, data.name);
  setValue(IFormField.PHONE_NUMBER, data.phoneNumber);
  setValue(IFormField.WEBSITE_URL, data.websiteURL);
  setValue(IFormField.COMPANY_EMAIL, data.email);
  setValue(IFormField.STREET1, data.street1);
  setValue(IFormField.CITY, data.city);
  setValue(IFormField.POSTCODE, data.postCode);
  setValue(IFormField.STATE, data.state);
  setValue(IFormField.COUNTRY, data.country);
  setValue(IFormField.TIMEZONE, data.timezone);
  setValue(IFormField.DATE_FORMAT, data.dateFormat);
  setValue(IFormField.TIME_FORMAT, data.timeFormat);
  setValue(IFormField.FIRST_DAY_OF_WEEK, data.firstDayOfWeek);
};

export const CompanyDetailsForm: FC = () => {
  const { data } = useGetCompany();
  const { setValue, register, handleSubmit, isPending } = useCompanyUpdate();

  useEffect(() => {
    if (data) {
      initializeCompanyData(data, setValue);
    }
  }, [data, setValue]);

  return (
    <section className="p-6 border rounded-md">
      <h3 className="font-bold text-2xl">Company details</h3>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Company name"
          name={IFormField.COMPANY_NAME}
          type="text"
          placeholder="example@gmail.com"
          register={register}
          containerClassName="w-full"
          labelClassName=""
          inputClassName="input input-bordered text-primary w-full"
        />
        <TextInput
          label="Phone number"
          name={IFormField.PHONE_NUMBER}
          type="text"
          placeholder="Phone number"
          register={register}
          containerClassName="w-full"
          labelClassName=""
          inputClassName="input input-bordered text-primary w-full"
        />
        <TextInput
          label="Website URL"
          name={IFormField.WEBSITE_URL}
          type="text"
          placeholder="Website URL"
          register={register}
          containerClassName="w-full"
          labelClassName=""
          inputClassName="input input-bordered text-primary w-full"
        />
        <TextInput
          label="Email address"
          name={IFormField.COMPANY_EMAIL}
          type="text"
          placeholder="Email address"
          register={register}
          containerClassName="w-full"
          labelClassName=""
          inputClassName="input input-bordered text-primary w-full"
        />
        <div className="divider"></div>
        <div className="flex items-center flex-col justify-center xl:gap-4 xl:flex-row">
          <TextInput
            label="Street"
            name={IFormField.STREET1}
            type="text"
            placeholder="Street"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="City"
            name={IFormField.CITY}
            type="text"
            placeholder="City"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
        </div>
        <div className="flex items-center flex-col justify-center xl:gap-4 xl:flex-row">
          <TextInput
            label="Postcode"
            name={IFormField.POSTCODE}
            type="text"
            placeholder="Postcode"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="State"
            name={IFormField.STATE}
            type="text"
            placeholder="State"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
        </div>
        <div className="divider"></div>
        <BusinessHoursEdit />
        <div className="divider"></div>
        <div className="p-6 border rounded-md">
          <h4 className="font-bold text-xl">Regional settings</h4>
          <TextInput
            label="Country"
            name={IFormField.COUNTRY}
            type="text"
            placeholder="Country"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="Timezone"
            name={IFormField.TIMEZONE}
            type="text"
            placeholder="Timezone"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="Date format"
            name={IFormField.DATE_FORMAT}
            type="text"
            placeholder="Date format"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="Time format"
            name={IFormField.TIME_FORMAT}
            type="text"
            placeholder="Time format"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
          <TextInput
            label="First day of the week"
            name={IFormField.FIRST_DAY_OF_WEEK}
            type="text"
            placeholder="First day of the week"
            register={register}
            containerClassName="w-full"
            labelClassName=""
            inputClassName="input input-bordered text-primary w-full"
          />
        </div>

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
    </section>
  );
};
