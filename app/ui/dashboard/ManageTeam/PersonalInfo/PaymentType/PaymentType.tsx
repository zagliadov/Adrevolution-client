"use client";

import { FC, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/app/lib/hooks/useModal";
import { Spinner } from "@/app/ui/spinner";
import {
  useGetPaymentTypeByUserId,
  useUpdatePaymentType,
} from "@/app/lib/queries/paymentType";
import { UpdatePaymentTypeDtoCostUnit } from "@/app/lib/api/generated";

interface ILabourCostProps {
  userId: string;
}

export const LabourCost: FC<ILabourCostProps> = ({ userId }) => {
  const { data } = useGetPaymentTypeByUserId(userId);
  const { handleUpdate, isPending } = useUpdatePaymentType(userId);
  const { openModal, closeModal } = useModal("change-labour-cost");
  const [labourCost, setLabourCost] = useState<string>("0.00");
  const [costUnit, setCostUnit] =
    useState<UpdatePaymentTypeDtoCostUnit>("PER_HOUR");

  useEffect(() => {
    if (data && data.labourCost !== undefined) {
      setLabourCost(data.labourCost);
      setCostUnit(data.costUnit);
    }
  }, [data]);

  const handleCostChange = (values: any) => {
    setLabourCost(values.floatValue?.toFixed(2) || "0.00");
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCostUnit(event.target.value as UpdatePaymentTypeDtoCostUnit);
  };

  const handleChangeLabourCost = async () => {
    await handleUpdate({ labourCost: labourCost, costUnit });
    closeModal();
  };

  return (
    <div className="">
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
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex items-end gap-2">
          <div className="flex items-center">
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-600">
                Employee cost
              </label>
              <NumericFormat
                thousandSeparator={true}
                prefix={"€ "}
                decimalScale={2}
                fixedDecimalScale={true}
                className="input input-bordered text-primary w-full"
                placeholder="€ 0.00"
                value={labourCost}
                onValueChange={handleCostChange}
              />
            </div>
          </div>
          <div className="flex">
            <select
              className="select select-bordered max-w-xs"
              value={costUnit}
              onChange={handleUnitChange}
            >
              <option value="PER_HOUR">per hour</option>
              <option value="PER_MONTH">per month</option>
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            className="btn btn-success btn-outline w-full md:w-20 flex items-center"
            onClick={openModal}
            disabled={isPending}
            type="button"
          >
            {isPending ? <Spinner className="w-8 h-7" /> : "Edit"}
          </button>
          <dialog id="change-labour-cost" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Labour Cost Change</h3>
              <p className="py-4">
                You are about to change the labour cost to {labourCost}{" "}
                {costUnit === "PER_HOUR" ? "per hour" : "per month"}. Please
                confirm if you want to proceed with this change.
              </p>
              <div className="modal-action">
                <div className="flex gap-4">
                  <button
                    className="btn btn-success"
                    onClick={handleChangeLabourCost}
                    type="button"
                  >
                    Save
                  </button>
                  <button className="btn" onClick={closeModal} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};
