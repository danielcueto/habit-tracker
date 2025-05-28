import { useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  if (!isOpen) return null;

  const handleClick = () => {
    if (onClose) onClose();
    setOpen(!open);
  };
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (onClose) onClose();
      setOpen(!open);
    }
  };
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-cente overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto opacity-45 bg-black"></div>
      <div className="bg-white p-6 z-60 rounded-lg shadow-lg relative min-w-86 mx-auto my-auto">
        <button
          onClick={handleClick}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
