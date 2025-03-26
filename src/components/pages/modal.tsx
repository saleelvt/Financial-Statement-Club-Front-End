

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: string; // Add this prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete, message }) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 shadow-lg">
        <p className="text-black mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
  
  <div className="flex items-center gap-2">
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
    <span>Deleting...</span>
  </div>


          </button>
        </div>
      </div>
    
    </div>
  );
};

export default Modal;
