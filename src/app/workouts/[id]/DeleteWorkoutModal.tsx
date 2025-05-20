export function DeleteConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h4 className="text-lg font-semibold text-stone-800 mb-4">
          Are you sure you want to delete this workout?
        </h4>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded hover:cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded hover:cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
