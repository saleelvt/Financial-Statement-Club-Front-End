import React from "react";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800">Validation Error</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button 
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ValidationModal;
