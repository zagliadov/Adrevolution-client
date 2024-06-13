"use client";

import { IFormField } from "@/app/lib/definitions";
import { useBusinessForm } from "@/app/lib/hooks/companyDetails/useBusinessForm";
import { FC } from "react";
import { SuccessButton } from "../../Button/SuccessButton/SuccessButton";
import TextInput from "../../DataInput/TextInput/TextInput";
import FormSelect from "../../DataInput/FormSelect/FormSelect";

const teamSizeOptions = [
  { label: "Just me" },
  { label: "2-3 people" },
  { label: "4-10 people" },
  { label: "10+ people" },
];

const estimatedAnnualRevenueOptions = [
  { label: "$0 - $50.000" },
  { label: "$50.000 - $150.000" },
  { label: "$150.000 - $500.000" },
  { label: "$500.000+" },
  { label: "I`d prefer not to say" },
];
export const BusinessForm: FC = () => {
  const { register, handleSubmit, onSubmit, isPending } = useBusinessForm();
  return (
    <form
      className="flex flex-col space-y-4 px-4 py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="What is your Company Name?"
        name={IFormField.COMPANY_NAME}
        type="text"
        placeholder="Type here"
        register={register}
        required={true}
      />
      <FormSelect
        label="What`s your team size (including yourself)?"
        name={IFormField.TEAM_SIZE}
        register={register}
        options={teamSizeOptions}
        required={true}
      />
      <FormSelect
        label="What`s your estimated annual revenue?"
        name={IFormField.ESTIMATED_ANNUAL_REVENUE}
        register={register}
        options={estimatedAnnualRevenueOptions}
        required={true}
      />
      <SuccessButton isPending={isPending}>Next</SuccessButton>
    </form>
  );
};
