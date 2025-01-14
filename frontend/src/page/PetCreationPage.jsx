import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { useLocation } from "react-router-dom";
import PetCard from "../component/PetCard";

function PetCreationPage() {
  const location = useLocation();
  const { petResponse } = location.state;
  console.log("pet response -> ", petResponse);

  return (
    <div className="flex flex-col p-10 mt-32 justify-center items-center">
      <PetCard petResponse={petResponse}></PetCard>
      <div className="flex gap-3 items-center py-5 text-2xl font-medium">
        <TfiWrite />
        Successfully Recorded <IoCheckmarkDoneCircle />
      </div>
    </div>
  );
}

export default PetCreationPage;
