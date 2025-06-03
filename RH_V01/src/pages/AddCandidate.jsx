"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material"
import { Business, Assessment, PersonAdd, Work, ExitToApp, MoreVert } from "@mui/icons-material"

function Navbar({ onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState(null)

  const menuItems = [
    { label: "Evaluaciones", path: "/evaluations", icon: <Assessment /> },
    { label: "Agregar Candidato", path: "/candidates/add", icon: <PersonAdd /> },
    { label: "Posiciones", path: "/positions", icon: <Work /> },
  ]

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path) => {
    navigate(path)
    handleMenuClose()
  }

  const handleLogoClick = () => {
    navigate("/")
  }

  const handleLogout = () => {
    onLogout()
    handleMenuClose()
  }

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {/* Logo */}
        <Tooltip title="Ir al Dashboard">
          <IconButton size="large" edge="start" color="inherit" onClick={handleLogoClick} sx={{ mr: 2 }}>
            <Business sx={{ fontSize: 32 }} />
          </IconButton>
        </Tooltip>

        {/* Título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema RH
        </Typography>

        {/* Navegación Desktop */}
        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                variant={location.pathname === item.path ? "outlined" : "text"}
                sx={{
                  borderColor: location.pathname === item.path ? "white" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
              sx={{
                ml: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        ) : (
          /* Navegación Mobile */
          <>
            <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {item.icon}
                    {item.label}
                  </Box>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ExitToApp />
                  Cerrar Sesión
                </Box>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
