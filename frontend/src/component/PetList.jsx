import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState(null);
  const baseURL = import.meta.env;
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `${baseURL.VITE_API_BASE_URL}/v1/pets/page/${pageNo}`
        );
        setPets(response.data.pets);
        setErr(null);
        if (response.data.pets.length == 0) {
          setErr("No pets available.");
        }
        setTotalPages(response.data.totalPages);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErr("Something went wrong while connecting to the server.");
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

  const handleSearch = async () => {
    if (searchName == "") {
      return;
    }
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `${baseURL.VITE_API_BASE_URL}/v1/pets/search/name/${searchName}`
        );
        setPets(response.data.pets);
        setErr(null);
        if (response.data.pets.length == 0) {
          setErr("No pets available with that name!");
        }
        setTotalPages(response.data.totalPages);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErr("Something went wrong while connecting to the server.");
      }
    };
    fetchPets();
  };
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <div>
      <div className=" bg-[#F9FAFB]">
        <div className="flex pt-10 px-16 mx-auto justify-between items-center">
          <div>
            <form
              onSubmit={handleSearch}
              className="flex gap-3 items-center justify-center"
            >
              <input
                type="text"
                id="searchName"
                name="searchName"
                value={searchName}
                onChange={handleSearchChange}
                placeholder="Search by name"
                className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA]"
                required
              ></input>
              <div>
                <button
                  type="submit"
                  className="cursor-pointer p-2 text-2xl text-center bg-black rounded-full text-white"
                  onClick={handleSearch}
                >
                  <FiSearch className="cursor" />
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#18181B] py-2 px-4 text-white rounded-md font-medium">
            <button
              className="flex items-center justify-center gap-3"
              onClick={() => navigate("/add")}
            >
              Add a pet <MdLibraryAdd className="text-xl" />
            </button>
          </div>
        </div>
        <div className="flex  flex-wrap gap-8 p-10 justify-center bg-[#F9FAFB]">
          {err ? (
            <h1 className="text-xl font-bold">{err}</h1>
          ) : pets.length > 0 ? (
            allPets
          ) : (
            <div className="text-xl font-bold">{err}</div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center my-4  justify-center">
        <button
          onClick={() => setPageNo((pageNo) => pageNo - 1)}
          disabled={pageNo === 1 || totalPages == 0}
          className={`border py-2  px-4 rounded-md text-white font-medium ${
            pageNo === 1 ? "bg-gray-400" : "bg-[#18181B]"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNo((pageNo) => pageNo + 1)}
          disabled={pageNo === totalPages || totalPages == 0}
          className={`border py-2  px-4 rounded-md text-white font-medium ${
            pageNo === totalPages ? "bg-gray-400" : "bg-[#18181B]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PetList;
