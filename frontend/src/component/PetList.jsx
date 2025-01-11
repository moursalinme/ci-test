import { useEffect, useState } from "react";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [err, setErr] = useState(null);
  const baseURL = import.meta.env;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log(
          `ja paisi = ${baseURL.VITE_API_BASE_URL}/v1/pets/page/${pageNo}`
        );
        const response = await fetch(
          `${baseURL.VITE_API_BASE_URL}/v1/pets/page/${pageNo}`
        );
        if (!response.ok) {
          setErr("Something went wrong! Try again by refreshing the page.");
          return;
        }
        console.log(response);
        const body = await response.json();
        console.log(body);
        setPets(body.pets);
        setTotalPages(body.totalPages);
      } catch (err) {
        console.log(err);
        setErr("Something went wrong. Maybe the page no is invalid.");
      }
    };

    fetchPets();
  }, [pageNo]);

  const allPets = pets.map((pet) => {
    return <PetCard petResponse={pet} key={pet.id} />;
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
