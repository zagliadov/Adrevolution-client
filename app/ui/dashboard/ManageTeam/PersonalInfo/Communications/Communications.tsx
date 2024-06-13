"use client";

import { useEffect, useState } from "react";
import {
  useCompanyUpdate,
  useGetCommunications,
} from "@/app/lib/queries/communications";
import { FC } from "react";
import { Spinner } from "@/app/ui/spinner";

export const Communications: FC = () => {
  const { data: communications, isSuccess } = useGetCommunications();
  const { handleUpdate, isPending } = useCompanyUpdate();
  const [surveys, setSurveys] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<boolean>(true);

  useEffect(() => {
    if (isSuccess && communications) {
      setSurveys(communications.surveys);
      setErrorMessages(communications.errorMessages);
    }
  }, [isSuccess, communications]);

  const handleSurveysChange = () => {
    setSurveys((prev) => !prev);
  };

  const handleErrorMessagesChange = () => {
    setErrorMessages((prev) => !prev);
  };

  const handleUpdateCommunication = async () => {
    await handleUpdate({
      surveys,
      errorMessages,
    });
  };

  if (!isSuccess) return null;

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
              onChange={handleSurveysChange}
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
      <div>
        <div className="form-control">
          <label className="cursor-pointer label flex justify-start gap-4">
            <input
              type="checkbox"
              checked={errorMessages}
              onChange={handleErrorMessagesChange}
              className="checkbox checkbox-success"
            />
            <span className="label-text text-neutral cursor-default">
              Error messages
            </span>
          </label>
        </div>
        <span className="label-text text-neutral">
          Get notified of warnings and errors in our (E.g. Undeliverable
          client emails or QuickBooks Online sync errors)
        </span>
      </div>
      <button
        className="btn btn-success btn-outline w-full md:w-20 flex items-center"
        onClick={handleUpdateCommunication}
        disabled={isPending}
        type="button"
      >
        {isPending ? <Spinner className="w-8 h-7" /> : "Edit"}
      </button>
    </div>
  );
};
