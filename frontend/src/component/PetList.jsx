import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [err, setErr] = useState(null);
  const baseURL = import.meta.env;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `${baseURL.VITE_API_BASE_URL}/v1/pets/page/${pageNo}`
        );
        setPets(response.data.pets);
        setErr(null);
        setTotalPages(response.data.totalPages);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErr("Something went wrong! Try again by refreshing the page.");
      }
    };
    fetchPets();
  }, [pageNo]);

  const handlePetClick = (petResponse) => {
    console.log("handleCLick -> ", petResponse);
    navigate("/edit", { state: { petResponse } });
  };

  const allPets = pets.map((pet) => {
    return (
      <div onClick={() => handlePetClick(pet)} key={pet.id}>
        <PetCard petResponse={pet} />
      </div>
    );
  });

  return (
    <div className=" ">
      <div className="flex  flex-wrap gap-8 p-10 justify-center bg-[#F9FAFB]">
        {err ? <h1 className="text-xl font-bold">{err}</h1> : allPets}
      </div>
      <div className="flex gap-4 items-center my-4  justify-center">
        <button
          onClick={() => setPageNo((pageNo) => pageNo - 1)}
          disabled={pageNo === 1}
          className={`border py-2  px-4 rounded-md text-white font-medium ${
            pageNo === 1 ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNo((pageNo) => pageNo + 1)}
          disabled={pageNo === totalPages}
          className={`border py-2  px-4 rounded-md text-white font-medium ${
            pageNo === totalPages ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PetList;
