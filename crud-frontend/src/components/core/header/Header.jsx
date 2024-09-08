import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* GitHub Icon with Username */}
        <div className="flex items-center">
          <FaGithub className="text-2xl mr-2" />
          <span className="text-lg">het-shah-25</span>{" "}
          {/* Replace with your username */}
        </div>

        {/* Logo in the center */}
        <div className="flex-grow text-center">
          <h1 className="text-2xl font-bold">Product Demo</h1>{" "}
          {/* Replace with an actual logo */}
        </div>

        {/* Empty div to balance the flex layout */}
        <div className="w-24"></div>
      </div>
    </header>
  );
};

export default Header;
