import { LuRotateCw } from "react-icons/lu";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button = ({ label, onClick, loading }: ButtonProps) => {
  return (
    <button
      className="flex px-3 justify-center items-center cursor-pointer min-w-24 h-10 text-center text-white font-semibold bg-indigo rounded-md hover:bg-darkIndigo"
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
