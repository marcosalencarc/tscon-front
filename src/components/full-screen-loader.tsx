// components/FullScreenLoader.tsx
import { motion } from "framer-motion";
import { Spinner } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";

interface FullScreenLoader {
  message: string
}

export const FullScreenLoader = ({message}: FullScreenLoader) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg bg-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <span className="text-blue-600 text-lg font-semibold">
          {message}
        </span>
      </motion.div>
    </motion.div>
  );
};