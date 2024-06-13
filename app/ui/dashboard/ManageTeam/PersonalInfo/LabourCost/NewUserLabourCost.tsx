"use client";

import { FC, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IFormField } from "@/app/lib/definitions";

interface INewUserLabourCostProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const NewUserLabourCost: FC<INewUserLabourCostProps> = ({
  register,
  setValue,
  watch,
}) => {
  const labourCost = watch(IFormField.LABOUR_COST);
  const costUnit = watch(IFormField.COST_UNIT);

  useEffect(() => {
    // Setting default values if needed
    setValue(IFormField.LABOUR_COST, 0);
    setValue(IFormField.COST_UNIT, "PER_HOUR");
  }, [setValue]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-bold">Labour cost</span>
        <div
          className="tooltip tooltip-top"
          data-tip="Includes wage, benefits and taxes for an employee. Changes to labor cost rate will only apply to new timesheet entries."
        >
          <InformationCircleIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex items-end gap-2">
          <div className="flex items-center">
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-600">
                Employee cost
              </label>
              <NumericFormat
                {...register(IFormField.LABOUR_COST)}
                thousandSeparator={true}
                prefix={"€ "}
                decimalScale={2}
                fixedDecimalScale={true}
                className="input input-bordered text-primary w-full"
                placeholder="€ 0.00"
                value={labourCost}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setValue(IFormField.LABOUR_COST, floatValue || 0);
                }}
              />
            </div>
          </div>
          <div className="flex">
            <select
              {...register(IFormField.COST_UNIT)}
              className="select select-bordered max-w-xs"
              value={costUnit}
              onChange={(e) => setValue(IFormField.COST_UNIT, e.target.value)}
            >
              <option value="PER_HOUR">per hour</option>
              <option value="PER_MONTH">per month</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
