import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PetForm() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    bday: "",
    bmonth: "",
    byear: "",
    breed: "",
    gender: "",
    status: "",
  });

  const navigate = useNavigate();

  const [invalidAge, setInvalidAge] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidAge = (day, month, year) => {
    const date = new Date(year, month - 1, day);

    if (
      date.getDate() !== Number(day) ||
      date.getMonth() !== Number(month - 1) ||
      date.getFullYear() !== Number(year)
    ) {
      console.log("Here");
      return false;
    }
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidAge(formData.bday, formData.bmonth, formData.byear)) {
      setInvalidAge("invalid age " + true);
      return;
    }

    setInvalidAge(false);

    const petRequest = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      birthday: `${String(Number(formData.bday)).padStart(2, 0)}-${String(
        Number(formData.bmonth)
      ).padStart(2, 0)}-${String(Number(formData.byear)).padStart(4, 0)}`,
      gender: formData.gender,
      status: formData.status,
    };

    const createPet = async (reqBody) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/v1/pets`,
          reqBody
        );
        setErrorResponse(false);
        navigate("success", { state: { petResponse: response.data } });
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErrorResponse(true);
      }
    };

    createPet(petRequest);
  };

  return (
    <div className="text-[#18181B] px-10 mb-10">
      {errorResponse && (
        <div className="w-full flex justify-center mt-2">
          <h1 className="bg-red-600 px-4 font-medium text-white p-2 rounded-md">
            Failed to create new Pet! Please try again and make sure the
            information is correct.
          </h1>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-10 mt-5 shadow-lg rounded-lg bg-background border-2 border-zinc-200"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block pb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Pet Name"
            className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="species" className="block pb-1 font-medium">
            Species
          </label>
          <input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            placeholder="Pet Species"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="breed" className="block pb-1 font-medium">
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Pet Breed"
            className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA]"
            required
          />
        </div>

        <div className="mb-4 flex flex-wrap justify-start items-center gap-6 pt-4 font-medium ">
          <div className="block pb-1  text-start">Birthday</div>
          <div>
            {/* <label className="block pb-1 font-medium">Day</label> */}
            <input
              type="number"
              min={1}
              max={31}
              name="bday"
              value={formData.bday}
              onChange={handleChange}
              placeholder="Day"
              className="w-20 p-2 border border-input rounded-md shadow-sm border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner text-center"
              required
            />
          </div>
          <div>
            {/* <label className="block pb-1 font-medium">Month</label> */}
            <input
              type="number"
              min={1}
              name="bmonth"
              value={formData.bmonth}
              onChange={handleChange}
              placeholder="Month"
              max={12}
              className="w-20 p-2 border border-input rounded-md shadow-sm  border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner text-center"
              required
            />
          </div>
          <div>
            {/* <label className="block pb-1 font-medium">Year</label> */}
            <input
              type="number"
              min={1900}
              max={2100}
              name="byear"
              value={formData.byear}
              onChange={handleChange}
              placeholder="Year"
              className="w-28 p-2 border border-input rounded-md shadow-sm  border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner text-center"
              required
            />
          </div>
          {invalidAge && (
            <div className="w-full flex justify-center mt-2">
              <h1 className="bg-red-600 text-white p-2 rounded-md">
                The age is not valid!
              </h1>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block pb-1 font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA] text-[#18181B]"
            required
          >
            <option value="" className="text-[#A1A1AA]">
              Select gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block pb-1 font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-[#E4E4E7] rounded-md shadow-sm focus:ring-[#A1A1AA] focus:border-[#A1A1AA] text-[#18181B]"
            required
          >
            <option value="" className="text-[#A1A1AA]">
              Select status
            </option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="UNDER_TREATMENT">Under treatment</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#18181B] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#27272A] focus:ring-2 focus:ring-[#27272A] focus:ring-offset-2"
        >
          Add pet
        </button>
      </form>
    </div>
  );
}

export default PetForm;
