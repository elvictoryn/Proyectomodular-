"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CandidatesList from "./pages/CandidatesList"
import AddCandidate from "./pages/AddCandidate"
import CandidateDetail from "./pages/CandidateDetail"
import Positions from "./pages/Positions"
import Evaluations from "./pages/Evaluations"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar si hay una sesión activa
    const session = localStorage.getItem("hr_session")
    if (session) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (success) => {
    setIsAuthenticated(success)
  }

  const handleLogout = () => {
    localStorage.removeItem("hr_session")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar onLogout={handleLogout} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<CandidatesList />} />
          <Route path="/candidates/add" element={<AddCandidate />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
