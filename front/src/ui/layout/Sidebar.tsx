import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`bg-mediumGrey transition-all duration-300 h-fit ${
        isOpen ? "w-64 h-full" : "w-fit"
      } p-4 rounded-lg`}
    >
      <GiHamburgerMenu
        className="text-indigo cursor-pointer text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="mt-4">
          <h1>teste</h1>
          {/* Adicione mais conteúdo aqui */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
