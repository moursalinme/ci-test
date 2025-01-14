import { AiOutlineClockCircle } from "react-icons/ai";
import { FaPaw } from "react-icons/fa6";
import { HiOutlineTag } from "react-icons/hi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { PiHashStraightFill } from "react-icons/pi";

import { PropTypes } from "prop-types";

PetCard.propTypes = {
  petResponse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
  }).isRequired,
};

function PetCard({ petResponse }) {
  return (
    <div className="border-2 rounded-lg p-4 hover:shadow-lg w-60 h-56 overflow-hidden hover:-translate-y-1 transition-transform duration-200 bg-white cursor-pointer">
      <div className="flex items-center mb-2 justify-center">
        <MdOutlineDriveFileRenameOutline className="mr-2" />
        <h2 className="font-bold text-lg">{petResponse.name}</h2>
      </div>
      <div className="flex items-center mb-1 text-lg font-medium">
        <FaPaw className=" text-gray-500 mr-2" />
        <span className="text-gray-700">{petResponse.species}</span>
      </div>
      <div className="flex items-center mb-1 text-lg">
        <AiOutlineClockCircle className=" text-gray-500 mr-2" />
        <span className="text-gray-700 text-base font-medium">
          {petResponse.age}
        </span>
      </div>
      <div className="pt-2 flex items-center justify-center">
        <span
          className={`font-medium px-3 py-1 rounded-lg flex justify-center items-center ${
            petResponse.status === "AVAILABLE"
              ? "bg-green-100 text-green-600"
              : petResponse.status === "SOLD"
              ? "bg-red-100 text-red-600"
              : petResponse.status === "UNDER_TREATMENT"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <HiOutlineTag className="mr-2" /> {petResponse.status}
        </span>
      </div>
      <div className="flex font-medium px-3 rounded-md items-center justify-center mt-3 mb-2">
        <p>ID</p>
        <PiHashStraightFill />
        <p className="ml-2">{petResponse.id}</p>
      </div>
    </div>
  );
}

export default PetCard;
