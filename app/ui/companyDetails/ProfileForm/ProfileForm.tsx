"use client";

import { CompanyType, IFormField, TransportCompanyType } from "@/app/lib/definitions";
import { useProfileUpdateUser } from "@/app/lib/hooks/companyDetails/useProfileUpdateUser";
import { FC } from "react";
import { SuccessButton } from "../../Button/SuccessButton/SuccessButton";
import TextInput from "../../DataInput/TextInput/TextInput";
import FormSelect from "../../DataInput/FormSelect/FormSelect";

const options = [
  {
    label: "Cleaning",
    options: [
      "Bin Cleaning",
      "Carpet Cleaning",
      "Commercial Cleaning",
      "Pressure Washing Service",
      "Residential Cleaning",
      "Window Washing",
    ],
  },
  {
    label: "Green Industry",
    options: [
      "Arborist / Tree Care",
      "Landscaping Contractor",
      "Lawn Care & Lawn Maintenance",
    ],
  },
  {
    label: "Hi Tech",
    options: ["Computers & IT", "Home Theater", "Security and Alarm"],
  },
  {
    label: "Trade",
    options: [
      "Construction & Contracting",
      "Electrical Contractor",
      "HVAC",
      "Locksmith",
      "Mechanical Service",
      "Plumbing",
    ],
  },
  {
    label: CompanyType.Transportation,
    options: Object.values(TransportCompanyType),
  },
  {
    label: "Other",
    options: [
      "Appliance Repair",
      "Flooring Service",
      "Handyman",
      "Junk Removal",
      "Painting",
      "Pest Control",
      "Pool and Spa Service",
      "Renovations",
      "Roofing Service",
      "Snow Removal",
      "Other",
    ],
  },
];

export const ProfileForm: FC = () => {
  const { handleSubmit, register, isPending } = useProfileUpdateUser();
  return (
    <form className="flex flex-col space-y-4 px-4 py-8" onSubmit={handleSubmit}>
      <TextInput
        label="What is your First name?"
        name={IFormField.FIRST_NAME}
        type="text"
        placeholder="Type here"
        register={register}
        required={true}
      />
      <TextInput
        label="What is your Last name?"
        name={IFormField.LAST_NAME}
        type="text"
        placeholder="Type here"
        register={register}
        required={true}
      />
      <TextInput
        label="What is your phone number?"
        name={IFormField.PHONE_NUMBER}
        type="text"
        placeholder="Type here"
        register={register}
        required={true}
      />
      <FormSelect
        label="Choose your industry"
        name={IFormField.INDUSTRY}
        register={register}
        options={options}
        required={true}
      />
      <SuccessButton isPending={isPending}>Next</SuccessButton>
    </form>
  );
};
