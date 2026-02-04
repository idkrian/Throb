import { LuRotateCw } from "react-icons/lu";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  color?: "error" | "alert";
}

const Button = ({ label, onClick, loading, color }: ButtonProps) => {
  const colorClasses = {
    error: "bg-red-500 hover:bg-red-600",
    alert: "bg-yellow-500 hover:bg-yellow-600",
  };

  const defaultClasses = "bg-indigo hover:bg-darkIndigo";
  const colorClass = color ? colorClasses[color] : defaultClasses;

  return (
    <button
      className={`flex px-3 justify-center items-center cursor-pointer min-w-24 h-10 text-center text-white font-semibold ${colorClass} rounded-md hover:bg-darkIndigo`}
      onClick={onClick}
    >
      <div className="w-full h-full flex justify-center items-center">
        {loading ? (
          <LuRotateCw size={24} className="rotate animate-spin" />
        ) : (
          label
        )}
      </div>
    </button>
  );
};

export default Button;
