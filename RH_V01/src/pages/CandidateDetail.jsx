"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import {
  ArrowBack,
  Edit,
  Delete,
  Email,
  Phone,
  Work,
  School,
  Schedule,
  AttachMoney,
  Person,
  Add,
  Event,
} from "@mui/icons-material"

function CandidateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState(null)
  const [openNoteDialog, setOpenNoteDialog] = useState(false)
  const [newNote, setNewNote] = useState("")

  // Datos de ejemplo - en producción vendría de la API
  useEffect(() => {
    // Simular carga de datos del candidato
    const mockCandidate = {
      id: Number.parseInt(id),
      name: "Ana García",
      email: "ana.garcia@email.com",
      phone: "+52 555 123 4567",
      position: "Desarrollador Frontend",
      status: "En proceso",
      experience: "3 años",
      education: "Licenciatura en Sistemas Computacionales",
      skills: ["JavaScript", "React", "HTML/CSS", "Git", "Node.js"],
      salary_expectation: "$25,000 - $30,000 MXN",
      availability: "Inmediata",
      dateApplied: "2024-01-15",
      notes: "Candidata muy prometedora con experiencia sólida en React.",
      timeline: [
        { date: "2024-01-15", event: "Aplicación recibida", type: "info" },
        { date: "2024-01-18", event: "CV revisado - Aprobado", type: "success" },
        { date: "2024-01-20", event: "Entrevista telefónica programada", type: "warning" },
        { date: "2024-01-22", event: "Entrevista técnica pendiente", type: "pending" },
      ],
    }
    setCandidate(mockCandidate)
  }, [id])

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

  const getTimelineColor = (type) => {
    switch (type) {
      case "success":
        return "success"
      case "warning":
        return "warning"
      case "pending":
        return "info"
      default:
        return "primary"
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Aquí iría la llamada a la API para agregar la nota
      console.log("Nueva nota:", newNote)
      setNewNote("")
      setOpenNoteDialog(false)
    }
  }

  const handleEdit = () => {
    console.log("Editar candidato:", id)
    // Aquí iría la navegación al formulario de edición
  }

  const handleDelete = () => {
    console.log("Eliminar candidato:", id)
    // Aquí iría la lógica para eliminar
  }

  if (!candidate) {
    return (
      <Container maxWidth="lg">
        <Typography>Cargando...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/candidates")} sx={{ mb: 2 }}>
          Volver a la lista
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            Detalles del Candidato
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDelete}>
              Eliminar
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main" }}>
                  <Person sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {candidate.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {candidate.position}
                  </Typography>
                  <Chip label={candidate.status} color={getStatusColor(candidate.status)} />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Email" secondary={candidate.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Teléfono" secondary={candidate.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Work color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Experiencia" secondary={candidate.experience} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Educación" secondary={candidate.education} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Expectativa Salarial" secondary={candidate.salary_expectation} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Disponibilidad" secondary={candidate.availability} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Habilidades
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {candidate.skills.map((skill) => (
                  <Chip key={skill} label={skill} variant="outlined" />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Notas
              </Typography>
              <Typography variant="body1" paragraph>
                {candidate.notes}
              </Typography>
              <Button startIcon={<Add />} onClick={() => setOpenNoteDialog(true)} variant="outlined" size="small">
                Agregar Nota
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cronología del Proceso
              </Typography>
              <List>
                {candidate.timeline.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Event color={getTimelineColor(item.type)} />
                    </ListItemIcon>
                    <ListItemText primary={item.event} secondary={item.date} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openNoteDialog} onClose={() => setOpenNoteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nueva Nota</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nota"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNoteDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddNote} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CandidateDetail
