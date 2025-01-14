import { useState } from "react";

function PetForm() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    breed: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="text-[#18181B] px-10 mb-10">
      <h1 className="pt-5 text-center text-2xl font-semibold">Pet Details</h1>
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
            placeholder="Pet Name"
            onChange={handleChange}
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

        <div className="mb-4 flex flex-wrap justify-start items-center gap-6 pt-4">
          <div className="block pb-1 font-medium text-start">Birthday</div>
          <div>
            {/* <label className="block pb-1 font-medium">Day</label> */}
            <input
              type="number"
              min={1}
              max={31}
              placeholder="Day"
              className="w-20 p-2 border border-input rounded-md shadow-sm border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner"
            />
          </div>
          <div>
            {/* <label className="block pb-1 font-medium">Month</label> */}
            <input
              type="number"
              min={1}
              placeholder="Month"
              max={12}
              className="w-20 p-2 border border-input rounded-md shadow-sm  border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner"
            />
          </div>
          <div>
            {/* <label className="block pb-1 font-medium">Year</label> */}
            <input
              type="number"
              min={1900}
              max={2100}
              placeholder="Year"
              className="w-28 p-2 border border-input rounded-md shadow-sm  border-[#E4E4E7]  focus:ring-[#A1A1AA] focus:border-[#A1A1AA] no-spinner"
            />
          </div>
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
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="SOLD">SOLD</option>
            <option value="UNDER_TREATMENT">UNDER TREATMENT</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#18181B] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#27272A] focus:ring-2 focus:ring-[#27272A] focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PetForm;
