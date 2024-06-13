import { useEffect, useState } from "react";

export const useSuccessMessage = (isSuccess: boolean) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return { showSuccessMessage };
};
