import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal = ({ isOpen, onClose, children, title }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-12 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold transition-colors cursor-pointer"
        >
          &times;
        </button>

        {title && (
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
