"use client";

import { COMMUNICATION } from "@/app/lib/definitions";
import { FC } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface IProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

export const NewUserCommunication: FC<IProps> = ({ register, watch }) => {
  const surveys = watch(COMMUNICATION.SURVEYS);
  return (
    <div className="border border-base-300 rounded-md p-4 space-y-4">
      <h3 className="font-bold text-2xl">Communications</h3>
      <h2 className="font-bold text-lg">Email subscriptions</h2>
      <div>
        <div className="form-control">
          <label className="cursor-pointer label flex justify-start gap-4">
            <input
              type="checkbox"
              checked={surveys}
              {...register(COMMUNICATION.SURVEYS)}
              className="checkbox checkbox-success"
            />
            <span className="label-text text-neutral cursor-default">
              Surveys
            </span>
          </label>
        </div>
        <span className="label-text text-neutral">
          Receive occasional surveys to tell us how we`re doing
        </span>
      </div>
    </div>
  );
};
