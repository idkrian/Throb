interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="cursor-pointer px-4 py-2 text-white font-semibold bg-indigo rounded-md hover:bg-darkIndigo"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
