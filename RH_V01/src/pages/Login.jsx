"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Business, Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material"

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Usuario por defecto
  const defaultUser = {
    username: "admin",
    password: "admin123",
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular delay de autenticación
    setTimeout(() => {
      if (formData.username === defaultUser.username && formData.password === defaultUser.password) {
        // Guardar sesión
        localStorage.setItem(
          "hr_session",
          JSON.stringify({
            username: formData.username,
            loginTime: new Date().toISOString(),
          }),
        )
        onLogin(true)
      } else {
        setError("Usuario o contraseña incorrectos")
      }
      setLoading(false)
    }, 1000)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
            <Business sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography component="h1" variant="h4" gutterBottom>
            Sistema RH
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Gestión de Candidatos
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                <strong>Credenciales de prueba:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Usuario: admin
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Contraseña: admin123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
