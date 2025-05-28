import { Modal } from "./Modal";

type ModalConfirmDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

export function ModalConfirmDelete({ isOpen, onClose, onConfirm, itemName }: ModalConfirmDeleteProps) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete {itemName}?</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}