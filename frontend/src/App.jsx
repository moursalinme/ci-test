import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" />
      </Routes>
    </React.Fragment>
  );
}

export default App;
