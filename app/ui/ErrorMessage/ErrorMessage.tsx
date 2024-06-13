import { FC } from "react";
import { motion } from "framer-motion";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="text-red-500 absolute"
      style={{ position: "relative" }}
    >
      <motion.div
        animate={{
          x: [0, -5, 5, -5, 5, 0],
        }}
        transition={{
          duration: 0.4,
          repeat: 0,
          repeatType: "loop",
        }}
      >
        {message}
      </motion.div>
    </motion.div>
  );
};
