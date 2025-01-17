import axios from "axios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function EditPage() {
  const location = useLocation();
  const { petResponse } = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: petResponse.name || "",
    species: petResponse.species || "",
    bday: petResponse.birthday?.split("-")[0] || "",
    bmonth: petResponse.birthday?.split("-")[1] || "",
    byear: petResponse.birthday?.split("-")[2] || "",
    breed: petResponse.breed || "",
    gender: petResponse.gender || "",
    status: petResponse.status || "",
  });

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
      version: petResponse.version,
    };

    const updatePet = async (reqBody) => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/pets/${petResponse.id}`,
          reqBody
        );
        console.log(response.data);
        setErrorResponse(false);
        navigate("/success", { state: { petResponse: response.data } });
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErrorResponse(true);
      }
    };

    updatePet(petRequest);
  };
  const [popupMsg, setPopUpMsg] = useState(
    "Are you sure you want to delete this pet? This action cannot be undone."
  );
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handlePetDeletion = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/v1/pets/${petResponse.id}`
      );
      navigate("/");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setPopUpMsg("Something went wrong while deleting! Please try again.");
    }
    console.log("Pet deleted");
    setShowDeletePopup(false);
  };

  const showpopup = () => {
    setShowDeletePopup(true);
  };

  return (
    <div className="text-[#18181B] px-10 mb-10">
      <div className="pt-5 text-center flex justify-center items-center text-2xl gap-10 font-semibold">
        <h1>Update Pet Details</h1>
        <div className="flex justify-center items-center gap-3">
          Delete this pet
          <button
            className="mt-2 bg-red-600 px-2 py-1 rounded-md text-white"
            onClick={showpopup}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">{popupMsg}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePetDeletion}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {errorResponse && (
        <div className="w-full flex justify-center mt-2">
          <h1 className="bg-red-600 px-4 font-medium text-white p-2 rounded-md">
            Failed to create update Pet! Please try again and make sure the
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
          Update pet
        </button>
      </form>
    </div>
  );
}

export default EditPage;
