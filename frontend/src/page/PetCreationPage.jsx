import { PropTypes } from "prop-types";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import PetCard from "../component/PetCard";

PetCreationPage.propTypes = {
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
function PetCreationPage({ petResponse }) {
  petResponse = {
    name: "Doggy",
    age: "2 years 5 months",
    species: "DOG",
    status: "SOLD",
  };
  return (
    <div className="flex flex-col p-10 mt-32 justify-center items-center">
      <PetCard petResponse={petResponse}></PetCard>
      <div className="flex gap-3 items-center py-5 text-2xl font-medium">
        <TfiWrite />
        Pet added to the records successfully <IoCheckmarkDoneCircle />
      </div>
    </div>
  );
}

export default PetCreationPage;
