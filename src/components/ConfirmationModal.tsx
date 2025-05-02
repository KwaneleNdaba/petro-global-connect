"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";
 

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: ReactNode;
  confirmText?: string;
  isLoading : boolean;
  cancelText?: string;
  icon?: ReactNode;
  confirmColor?: "failure" | "success" | "primary" | "warning";
}

export function ConfirmationModal({
  show,
  onClose,
  isLoading,
  onConfirm,
  title,
  message,
  confirmText = "Yes, I'm sure",
  cancelText = "No, cancel",
  icon = <AlertCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />,
  confirmColor = "failure",
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      {title && <ModalHeader>{title}</ModalHeader>}
      <ModalBody>
        <div className="text-center">
          {icon}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button className="cursor-pointer" color={confirmColor} onClick={handleConfirm}>
                   {confirmText}
            </Button>
            <Button  className="cursor-pointer" color="gray" onClick={onClose}>
              {cancelText}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}