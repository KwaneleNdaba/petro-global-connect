import { useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  station: string;
  isAssigning?:boolean
}

export const AssignmentConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  name,
  station,
  isAssigning
}: ConfirmationModalProps) => {

  return (
    <AnimatePresence>
      {show && (
        <Modal show={show} onClose={onClose} size="md" popup>
          {/* Overlay Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed "
          />

          {/* Modal Content Animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <ModalBody className="p-6 text-center">
              <div className="mb-4">
                {/* Animated Warning Icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: 1, duration: 0.5 }}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </motion.div>

                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Are you sure you want to {!isAssigning ? "assign " : "unassign "}
                  <span className="font-bold text-blue-600">{name} </span> {!isAssigning ? " to" : " from"}{" "}
                  <span className="font-bold text-blue-600">{station}</span>?
                </h3>
                {/* <p className="mt-2 text-sm text-gray-500">
                  This action cannot be undone.
                </p> */}
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className="rounded-lg bg-neutral-500 px-4 py-2 text-sm font-medium cursor-pointer text-white hover:bg-neutral-600"
                >
                  Confirm
                </motion.button>
              </div>
            </ModalBody>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

