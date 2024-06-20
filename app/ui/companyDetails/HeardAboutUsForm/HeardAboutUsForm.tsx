"use client";

import { ROUTES } from "@/app/lib/constants/routes";
import { IFormField } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, FC } from "react";
import { SuccessButton } from "../../Button/SuccessButton/SuccessButton";
import TextInput from "../../DataInput/TextInput/TextInput";
import { useCompanyUpdate } from "@/app/lib/queries/company";

export const HeardAboutUsForm: FC = () => {
  const { register, handleSubmit, isPending } = useCompanyUpdate();
  const router = useRouter();

  const onSubmit = async (
    data: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    await handleSubmit(data);
    router.replace(ROUTES.DASHBOARD);
  };
  return (
    <form className="flex flex-col space-y-4 px-4 py-8" onSubmit={onSubmit}>
      <TextInput
        label="How did you find out about us?"
        name={IFormField.HEARD_ABOUT_US}
        type="text"
        placeholder="Type here"
        register={register}
        required={true}
      />

      <SuccessButton isPending={isPending}>Next</SuccessButton>
    </form>
  );
};
