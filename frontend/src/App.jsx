import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreatePetPage from "./page/CreatePetPage";
import EditPage from "./page/EditPage";
import LandingPage from "./page/LandingPage";
import PetCreationPage from "./page/PetCreationPage";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<CreatePetPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/add/success" element={<PetCreationPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
