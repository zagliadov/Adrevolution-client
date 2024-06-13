import { useState, useCallback } from "react";

export const useModal = (modalId: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    const modal = document.getElementById(modalId);
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
      setIsOpen(true);
    }
  }, [modalId]);

  const closeModal = useCallback(() => {
    const modal = document.getElementById(modalId);
    if (modal instanceof HTMLDialogElement) {
      modal.close();
      setIsOpen(false);
    }
  }, [modalId]);

  return { isOpen, openModal, closeModal };
};
