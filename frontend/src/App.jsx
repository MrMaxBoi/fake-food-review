// src/App.jsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import BaitPage from "./pages/BaitPage";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";

export default function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<BaitPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Box>
  );
}