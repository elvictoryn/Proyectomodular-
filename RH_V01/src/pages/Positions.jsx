"use client"

import { useState } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Add, Edit, Delete, People, Visibility } from "@mui/icons-material"

function Positions() {
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: "Desarrollador Frontend",
      department: "Tecnología",
      status: "Activa",
      candidates: 12,
      description: "Buscamos desarrollador con experiencia en React y JavaScript",
      requirements: "React, JavaScript, HTML/CSS, Git",
      salary: "$25,000 - $35,000 MXN",
      datePosted: "2024-01-10",
    },
    {
      id: 2,
      title: "Diseñador UX/UI",
      department: "Diseño",
      status: "Activa",
      candidates: 8,
      description: "Diseñador creativo para mejorar la experiencia de usuario",
      requirements: "Figma, Adobe XD, Photoshop, Experiencia en UX",
      salary: "$20,000 - $28,000 MXN",
      datePosted: "2024-01-12",
    },
    {
      id: 3,
      title: "Project Manager",
      department: "Gestión",
      status: "Pausada",
      candidates: 15,
      description: "Líder de proyectos con experiencia en metodologías ágiles",
      requirements: "Scrum, Agile, Liderazgo, Comunicación",
      salary: "$35,000 - $45,000 MXN",
      datePosted: "2024-01-05",
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [editingPosition, setEditingPosition] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    status: "Activa",
    description: "",
    requirements: "",
    salary: "",
  })

  const departments = [
    "Tecnología",
    "Diseño",
    "Marketing",
    "Ventas",
    "Recursos Humanos",
    "Finanzas",
    "Gestión",
    "Operaciones",
  ]

  const statusOptions = ["Activa", "Pausada", "Cerrada"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Activa":
        return "success"
      case "Pausada":
        return "warning"
      case "Cerrada":
        return "error"
      default:
        return "default"
    }
  }

  const handleOpenDialog = (position = null) => {
    if (position) {
      setEditingPosition(position)
      setFormData({
        title: position.title,
        department: position.department,
        status: position.status,
        description: position.description,
        requirements: position.requirements,
        salary: position.salary,
      })
    } else {
      setEditingPosition(null)
      setFormData({
        title: "",
        department: "",
        status: "Activa",
        description: "",
        requirements: "",
        salary: "",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPosition(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (editingPosition) {
      // Editar posición existente
      setPositions((prev) => prev.map((pos) => (pos.id === editingPosition.id ? { ...pos, ...formData } : pos)))
    } else {
      // Crear nueva posición
      const newPosition = {
        id: Date.now(),
        ...formData,
        candidates: 0,
        datePosted: new Date().toISOString().split("T")[0],
      }
      setPositions((prev) => [...prev, newPosition])
    }
    handleCloseDialog()
  }

  const handleDelete = (id) => {
    setPositions((prev) => prev.filter((pos) => pos.id !== id))
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Posiciones Abiertas
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Nueva Posición
        </Button>
      </Box>

      <Grid container spacing={3}>
        {positions.map((position) => (
          <Grid item xs={12} md={6} lg={4} key={position.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {position.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {position.department}
                    </Typography>
                  </Box>
                  <Chip label={position.status} color={getStatusColor(position.status)} size="small" />
                </Box>

                <Typography variant="body2" paragraph>
                  {position.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Requisitos:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {position.requirements}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Salario:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {position.salary}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">{position.candidates} candidatos</Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Publicada: {position.datePosted}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <IconButton size="small" color="primary" title="Ver candidatos">
                    <Visibility />
                  </IconButton>
                  <Box>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleOpenDialog(position)}
                      title="Editar"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(position.id)} title="Eliminar">
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingPosition ? "Editar Posición" : "Nueva Posición"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Título de la Posición"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Departamento</InputLabel>
                <Select name="department" value={formData.department} onChange={handleInputChange} label="Departamento">
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select name="status" value={formData.status} onChange={handleInputChange} label="Estado">
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rango Salarial"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="ej: $25,000 - $35,000 MXN"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requisitos"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                multiline
                rows={2}
                placeholder="Separar con comas"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPosition ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Positions
