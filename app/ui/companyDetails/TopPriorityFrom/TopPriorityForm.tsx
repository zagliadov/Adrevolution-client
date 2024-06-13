"use client";

import { ROUTES } from "@/app/lib/constants/routes";
import { IFormField } from "@/app/lib/definitions";
import { useCompanyDetailsUpdate } from "@/app/lib/hooks/companyDetails/useCompanyDetailsUpdate";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, FC, useState } from "react";
import { SuccessButton } from "../../Button/SuccessButton/SuccessButton";

export const TopPriorityForm: FC = () => {
  const [selectedOption, setSelectedOption] = useState("Win more work");
  const { register, handleSubmit, isPending } = useCompanyDetailsUpdate();
  const router = useRouter();

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const onSubmit = async (
    data: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    await handleSubmit(data);
    router.replace(ROUTES.WELCOME_HEARD_ABOUT_US);
  };
  return (
    <form className="flex flex-col space-y-4 px-4 py-8" onSubmit={onSubmit}>
      <div className="form-control w-full max-w-xs">
        <label className="label cursor-pointer">
          <span
            className={`label-text ${
              selectedOption === "Win more work" ? "font-bold" : ""
            }`}
          >
            Win more work
          </span>
          <input
            type="radio"
            value="Win more work"
            {...register(IFormField.TOP_PRIORITY, { required: true })}
            className="radio checked:bg-success"
            checked={selectedOption === "Win more work"}
            onChange={() => handleOptionChange("Win more work")}
          />
        </label>
        <label className="label cursor-pointer">
          <span
            className={`label-text ${
              selectedOption === "Get paid faster" ? "font-bold" : ""
            }`}
          >
            Get paid faster
          </span>
          <input
            type="radio"
            value="Get paid faster"
            {...register(IFormField.TOP_PRIORITY, { required: true })}
            className="radio checked:bg-success"
            checked={selectedOption === "Get paid faster"}
            onChange={() => handleOptionChange("Get paid faster")}
          />
        </label>
        <label className="label cursor-pointer">
          <span
            className={`label-text ${
              selectedOption === "Increase efficiency" ? "font-bold" : ""
            }`}
          >
            Increase efficiency
          </span>
          <input
            type="radio"
            value="Increase efficiency"
            {...register(IFormField.TOP_PRIORITY, { required: true })}
            className="radio checked:bg-success"
            checked={selectedOption === "Increase efficiency"}
            onChange={() => handleOptionChange("Increase efficiency")}
          />
        </label>
      </div>
      <SuccessButton isPending={isPending}>Next</SuccessButton>
    </form>
  );
};
