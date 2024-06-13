"use client";

import { useModal } from "@/app/lib/hooks/useModal";
import { FC } from "react";

export const ChangePasswordModal: FC = () => {
  const { isOpen, openModal, closeModal } = useModal("change-password-modal");
  return (
    <>
      <button className="btn btn-outline" type="button" onClick={openModal}>
        Change Password
      </button>
      <dialog id="change-password-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" type="button">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
