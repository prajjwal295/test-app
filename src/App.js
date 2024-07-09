import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Page from "./Pages/Page";

const App = () => {
  return (
    <div className="font-enter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:id" element={<Page />} />
      </Routes>
    </div>
  );
};

export default App;
