import { AiOutlineClockCircle } from "react-icons/ai";
import { FaPaw } from "react-icons/fa6";
import { HiOutlineTag } from "react-icons/hi";

const PetCard = () => {
  const petResponse = {
    id: 1,
    name: "Max",
    species: "Dog",
    age: 2,
    gender: "Male",
    status: "AVAILABLE",
    version: 1,
  };
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg max-w-xs overflow-hidden m-10">
      <div className="flex items-center mb-2 justify-center">
        <h2 className="font-bold text-lg">{petResponse.name}</h2>
      </div>
      <div className="flex items-center mb-1 text-lg">
        <FaPaw className=" text-gray-500 mr-2" />
        <span className="text-gray-700">{petResponse.species}</span>
      </div>
      <div className="flex items-center mb-1 text-lg">
        <AiOutlineClockCircle className=" text-gray-500 mr-2" />
        <span className="text-gray-700">{petResponse.age} years old</span>
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
    </div>
  );
};

export default PetCard;
