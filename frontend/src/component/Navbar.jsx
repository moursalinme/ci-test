import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="py-5 px-8 border-b border-gray-300">
      <div className="font-semibold text-2xl text-center">
        <span className="cursor-pointer" onClick={goToHome}>
          Pet Store Management
        </span>
      </div>
    </div>
  );
}

export default Navbar;
