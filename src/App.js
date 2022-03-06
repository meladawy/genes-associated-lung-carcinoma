import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";import Container from 'react-bootstrap/Container';

import Home from "./Pages/Home";

import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h2 className="header text-uppercase mb-5">Genes associated with lung carcinoma</h2>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
