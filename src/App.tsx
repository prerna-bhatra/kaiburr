import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import "./App.css";
import Home from "./components/Home";
import DataTable from "./components/DataTable";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
