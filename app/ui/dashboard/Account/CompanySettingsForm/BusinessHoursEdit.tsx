"use client";

import { FC, useEffect, useState } from "react";
import _ from "lodash";
import { BusinessHoursDto } from "@/app/lib/api/generated";
import { useModal } from "@/app/lib/hooks/useModal";
import { useSuccessMessage } from "@/app/lib/hooks/useSuccessMessage";
import {
  useGetBusinessHours,
  usePatchBusinessHours,
} from "@/app/lib/queries/businessHours";
import { useCompanyUpdate, useGetCompany } from "@/app/lib/queries/company";
import { get } from "lodash";

interface BusinessHour {
  start: string;
  end: string;
  enabled: boolean;
}

interface BusinessHours {
  monday: BusinessHour;
  tuesday: BusinessHour;
  wednesday: BusinessHour;
  thursday: BusinessHour;
  friday: BusinessHour;
  saturday: BusinessHour;
  sunday: BusinessHour;
}

interface IProps {
  heading?: string;
  description?: string;
}
export const BusinessHoursEdit: FC<IProps> = ({
  heading = "Business hours",
  description = `Business hours set your default availability for online booking, team
        members, and request forms.`,
}) => {
  const [businessHours, setBusinessHours] = useState<BusinessHours>();
  const { data: businessHoursData, isSuccess } = useGetBusinessHours();
  const { handleUpdate: handleUpdateBusinessHours } = usePatchBusinessHours();
  const { data: company } = useGetCompany();
  const { handleUpdate: handleCompanyUpdate, isSuccess: companyUpdateSuccess } =
    useCompanyUpdate();

  const displayBHours = get(company, "displayBusinessHours", false);
  const { openModal, closeModal } = useModal("business-hours-edit");
  const { showSuccessMessage } = useSuccessMessage(companyUpdateSuccess);

  const parseBusinessHours = (data: BusinessHoursDto): BusinessHours => {
    return {
      monday: JSON.parse(data.monday),
      tuesday: JSON.parse(data.tuesday),
      wednesday: JSON.parse(data.wednesday),
      thursday: JSON.parse(data.thursday),
      friday: JSON.parse(data.friday),
      saturday: JSON.parse(data.saturday),
      sunday: JSON.parse(data.sunday),
    };
  };

  useEffect(() => {
    if (businessHoursData) {
      setBusinessHours(parseBusinessHours(businessHoursData));
    }
  }, [businessHoursData]);

  const handleClick = () => {
    openModal();
  };

  const handleClose = () => {
    closeModal();
    if (businessHoursData) {
      setBusinessHours(parseBusinessHours(businessHoursData));
    }
  };

  const handleSave = async () => {
    if (businessHours) {
      const updateData: BusinessHoursDto = {
        monday: JSON.stringify(businessHours.monday),
        tuesday: JSON.stringify(businessHours.tuesday),
        wednesday: JSON.stringify(businessHours.wednesday),
        thursday: JSON.stringify(businessHours.thursday),
        friday: JSON.stringify(businessHours.friday),
        saturday: JSON.stringify(businessHours.saturday),
        sunday: JSON.stringify(businessHours.sunday),
      };
      await handleUpdateBusinessHours(updateData);
      handleClose();
    }
  };

  const handleChangeDisplayBusinessHours = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.checked;
    handleCompanyUpdate({
      displayBusinessHours: value,
    });
  };

  if (!businessHours) {
    return null;
  }

  return (
    <section className="p-6 border rounded-md">
      <h4 className="font-bold text-xl">{heading}</h4>
      <p>{description}</p>
      <div className="flex flex-col lg:flex-row lg:justify-between py-6">
        <div className="space-y-2">
          {_.map(businessHours, (hours, day) => (
            <div
              key={day}
              className="flex justify-between gap-6 border-b-2 py-2"
            >
              <span>{_.capitalize(day)}</span>
              <span>
                {hours.enabled ? `${hours.start} – ${hours.end}` : "(Closed)"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between items-center">
          <button
            className="btn btn-success btn-outline w-full lg:w-auto"
            onClick={handleClick}
            type="button"
          >
            Edit
          </button>
          <dialog id="business-hours-edit" className="modal">
            <div className="modal-box flex flex-col items-center">
              <h3 className="font-bold text-lg">Edit Business Hours</h3>
              <div className="space-y-2">
                {_.map(businessHours, (hours, day) => (
                  <div key={day} className="flex justify-between items-center">
                    <div className="flex flex-col p-1 space-y-1">
                      <div className="flex justify-between">
                        <span>{_.capitalize(day)}</span>
                        <input
                          type="checkbox"
                          checked={hours.enabled}
                          className="toggle toggle-success"
                          onChange={(e) =>
                            setBusinessHours((prev: any) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                enabled: e.target.checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex justify-start gap-4 items-center">
                        <input
                          type="time"
                          defaultValue={hours.start}
                          className="input input-bordered w-28"
                          onChange={(e) =>
                            setBusinessHours((prev: any) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                start: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          type="time"
                          defaultValue={hours.end}
                          className="input input-bordered w-28"
                          onChange={(e) =>
                            setBusinessHours((prev: any) => ({
                              ...prev,
                              [day]: { ...prev[day], end: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-action">
                <div>
                  <button
                    onClick={handleSave}
                    className="btn btn-success"
                    type="button"
                  >
                    Save
                  </button>
                  <button className="btn" onClick={handleClose} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between relative">
          <h5 className="font-bold">Show business hours</h5>
          <label className="cursor-pointer label flex flex-col relative pb-6">
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={displayBHours}
              onChange={handleChangeDisplayBusinessHours}
            />
            {showSuccessMessage && (
              <span className="label-text text-success absolute bottom-0">
                Save!
              </span>
            )}
          </label>
        </div>
        <p>Display your business hours on client hub.</p>
      </div>
    </section>
  );
};
