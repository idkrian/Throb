import { LuTriangleAlert } from "react-icons/lu";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onCancel}
    >
      <div
        className="bg-mediumGrey rounded-lg p-6 w-96 shadow-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
            <LuTriangleAlert size={32} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          {description && (
            <p className="text-sm text-lightGrey/70 text-center">{description}</p>
          )}
          <div className="flex w-full gap-2 mt-2">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-md px-3 py-2 text-sm font-semibold bg-darkGrey hover:bg-darkGrey/80 cursor-pointer transition disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-md px-3 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 cursor-pointer transition disabled:opacity-50"
            >
              {loading ? "..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
