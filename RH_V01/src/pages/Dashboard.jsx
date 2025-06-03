"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material"
import { People, PersonAdd, Work, TrendingUp, Search, Visibility, Edit, Delete } from "@mui/icons-material"
import { DataGrid } from "@mui/x-data-grid"

function Dashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo - en producción vendrían de la API
  const stats = {
    totalCandidates: 156,
    newThisMonth: 23,
    activePositions: 8,
    interviewsScheduled: 12,
  }

  const [candidates] = useState([
    {
      id: 1,
      name: "Ana García",
      email: "ana.garcia@email.com",
      phone: "+52 555 123 4567",
      position: "Desarrollador Frontend",
      status: "En proceso",
      experience: "3 años",
      dateApplied: "2024-01-15",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      phone: "+52 555 234 5678",
      position: "Diseñador UX",
      status: "Entrevista",
      experience: "5 años",
      dateApplied: "2024-01-10",
    },
    {
      id: 3,
      name: "María Rodríguez",
      email: "maria.rodriguez@email.com",
      phone: "+52 555 345 6789",
      position: "Project Manager",
      status: "Nuevo",
      experience: "7 años",
      dateApplied: "2024-01-20",
    },
    {
      id: 4,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+52 555 456 7890",
      position: "Backend Developer",
      status: "Finalizado",
      experience: "4 años",
      dateApplied: "2024-01-05",
    },
    {
      id: 5,
      name: "Laura Martínez",
      email: "laura.martinez@email.com",
      phone: "+52 555 567 8901",
      position: "QA Tester",
      status: "En proceso",
      experience: "2 años",
      dateApplied: "2024-01-18",
    },
    {
      id: 6,
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "+52 555 678 9012",
      position: "DevOps Engineer",
      status: "Entrevista",
      experience: "6 años",
      dateApplied: "2024-01-12",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "Nuevo":
        return "primary"
      case "En proceso":
        return "warning"
      case "Entrevista":
        return "info"
      case "Finalizado":
        return "success"
      case "Rechazado":
        return "error"
      default:
        return "default"
    }
  }

  const handleView = (id) => {
    navigate(`/candidates/${id}`)
  }

  const handleEdit = (id) => {
    console.log("Editar candidato:", id)
    // Aquí iría la lógica para editar
  }

  const handleDelete = (id) => {
    console.log("Eliminar candidato:", id)
    // Aquí iría la lógica para eliminar
  }

  const columns = [
    {
      field: "personalInfo",
      headerName: "Información Personal",
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            {params.row.phone}
          </Typography>
        </Box>
      ),
    },
    {
      field: "position",
      headerName: "Posición",
      width: 180,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 130,
      renderCell: (params) => <Chip label={params.value} color={getStatusColor(params.value)} size="small" />,
    },
    {
      field: "experience",
      headerName: "Experiencia",
      width: 120,
    },
    {
      field: "dateApplied",
      headerName: "Fecha Aplicación",
      width: 140,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Ver detalles">
            <IconButton size="small" onClick={() => handleView(params.row.id)} color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton size="small" onClick={() => handleEdit(params.row.id)} color="secondary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" onClick={() => handleDelete(params.row.id)} color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard - Gestión de Candidatos
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <People color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Candidatos</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {stats.totalCandidates}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonAdd color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Nuevos este mes</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {stats.newThisMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Work color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Posiciones Activas</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {stats.activePositions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Entrevistas</Typography>
              </Box>
              <Typography variant="h3" color="info.main">
                {stats.interviewsScheduled}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla de Candidatos */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Candidatos Recientes</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Buscar candidatos por nombre, email, posición o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={filteredCandidates}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5, 8, 10]}
              disableSelectionOnClick
              sx={{
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Dashboard
