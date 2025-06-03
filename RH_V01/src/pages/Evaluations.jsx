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
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import { Add, Edit, Delete, Visibility, Assessment } from "@mui/icons-material"

function Evaluations() {
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      candidateName: "Ana García",
      candidateId: 1,
      position: "Desarrollador Frontend",
      evaluator: "Carlos Mendoza",
      date: "2024-01-22",
      status: "Completada",
      overallRating: 4.5,
      technicalSkills: 4,
      communication: 5,
      problemSolving: 4,
      teamwork: 5,
      notes: "Excelente candidata con sólidos conocimientos técnicos y muy buena comunicación.",
    },
    {
      id: 2,
      candidateName: "Carlos López",
      candidateId: 2,
      position: "Diseñador UX",
      evaluator: "María Silva",
      date: "2024-01-20",
      status: "Pendiente",
      overallRating: 0,
      technicalSkills: 0,
      communication: 0,
      problemSolving: 0,
      teamwork: 0,
      notes: "",
    },
    {
      id: 3,
      candidateName: "María Rodríguez",
      candidateId: 3,
      position: "Project Manager",
      evaluator: "Roberto García",
      date: "2024-01-18",
      status: "En progreso",
      overallRating: 3.5,
      technicalSkills: 3,
      communication: 4,
      problemSolving: 4,
      teamwork: 3,
      notes: "Buena experiencia en gestión, necesita mejorar habilidades técnicas.",
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [editingEvaluation, setEditingEvaluation] = useState(null)
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateId: "",
    position: "",
    evaluator: "",
    technicalSkills: 0,
    communication: 0,
    problemSolving: 0,
    teamwork: 0,
    notes: "",
    status: "Pendiente",
  })

  const statusOptions = ["Pendiente", "En progreso", "Completada"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completada":
        return "success"
      case "En progreso":
        return "warning"
      case "Pendiente":
        return "error"
      default:
        return "default"
    }
  }

  const handleOpenDialog = (evaluation = null) => {
    if (evaluation) {
      setEditingEvaluation(evaluation)
      setFormData({
        candidateName: evaluation.candidateName,
        candidateId: evaluation.candidateId,
        position: evaluation.position,
        evaluator: evaluation.evaluator,
        technicalSkills: evaluation.technicalSkills,
        communication: evaluation.communication,
        problemSolving: evaluation.problemSolving,
        teamwork: evaluation.teamwork,
        notes: evaluation.notes,
        status: evaluation.status,
      })
    } else {
      setEditingEvaluation(null)
      setFormData({
        candidateName: "",
        candidateId: "",
        position: "",
        evaluator: "",
        technicalSkills: 0,
        communication: 0,
        problemSolving: 0,
        teamwork: 0,
        notes: "",
        status: "Pendiente",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingEvaluation(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRatingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateOverallRating = () => {
    const { technicalSkills, communication, problemSolving, teamwork } = formData
    return (technicalSkills + communication + problemSolving + teamwork) / 4
  }

  const handleSubmit = () => {
    const overallRating = calculateOverallRating()

    if (editingEvaluation) {
      setEvaluations((prev) =>
        prev.map((evaluation) =>
          evaluation.id === editingEvaluation.id
            ? { ...evaluation, ...formData, overallRating, date: new Date().toISOString().split("T")[0] }
            : evaluation,
        ),
      )
    } else {
      const newEvaluation = {
        id: Date.now(),
        ...formData,
        overallRating,
        date: new Date().toISOString().split("T")[0],
      }
      setEvaluations((prev) => [...prev, newEvaluation])
    }
    handleCloseDialog()
  }

  const handleDelete = (id) => {
    setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id))
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Evaluaciones de Candidatos
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Nueva Evaluación
        </Button>
      </Box>

      <Grid container spacing={3}>
        {evaluations.map((evaluation) => (
          <Grid item xs={12} md={6} lg={4} key={evaluation.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {evaluation.candidateName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {evaluation.position}
                    </Typography>
                  </Box>
                  <Chip label={evaluation.status} color={getStatusColor(evaluation.status)} size="small" />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Evaluador: {evaluation.evaluator}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fecha: {evaluation.date}
                  </Typography>
                </Box>

                {evaluation.status === "Completada" && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Calificación General
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Rating value={evaluation.overallRating} readOnly precision={0.5} />
                        <Typography variant="body2">({evaluation.overallRating.toFixed(1)})</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Habilidades:
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Técnicas" />
                          <ListItemSecondaryAction>
                            <Rating value={evaluation.technicalSkills} readOnly size="small" />
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Comunicación" />
                          <ListItemSecondaryAction>
                            <Rating value={evaluation.communication} readOnly size="small" />
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Resolución de Problemas" />
                          <ListItemSecondaryAction>
                            <Rating value={evaluation.problemSolving} readOnly size="small" />
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Trabajo en Equipo" />
                          <ListItemSecondaryAction>
                            <Rating value={evaluation.teamwork} readOnly size="small" />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}

                {evaluation.notes && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Notas:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {evaluation.notes}
                    </Typography>
                  </Box>
                )}
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <IconButton size="small" color="primary" title="Ver detalles">
                    <Visibility />
                  </IconButton>
                  <Box>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleOpenDialog(evaluation)}
                      title="Editar"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(evaluation.id)} title="Eliminar">
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
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Assessment />
            {editingEvaluation ? "Editar Evaluación" : "Nueva Evaluación"}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre del Candidato"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Posición"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Evaluador"
                name="evaluator"
                value={formData.evaluator}
                onChange={handleInputChange}
                required
              />
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

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Calificaciones
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Habilidades Técnicas
                </Typography>
                <Rating
                  value={formData.technicalSkills}
                  onChange={(event, newValue) => handleRatingChange("technicalSkills", newValue)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Comunicación
                </Typography>
                <Rating
                  value={formData.communication}
                  onChange={(event, newValue) => handleRatingChange("communication", newValue)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Resolución de Problemas
                </Typography>
                <Rating
                  value={formData.problemSolving}
                  onChange={(event, newValue) => handleRatingChange("problemSolving", newValue)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Trabajo en Equipo
                </Typography>
                <Rating
                  value={formData.teamwork}
                  onChange={(event, newValue) => handleRatingChange("teamwork", newValue)}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas y Comentarios"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Observaciones, fortalezas, áreas de mejora, etc."
              />
            </Grid>

            {(formData.technicalSkills > 0 ||
              formData.communication > 0 ||
              formData.problemSolving > 0 ||
              formData.teamwork > 0) && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Calificación General Calculada:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={calculateOverallRating()} readOnly precision={0.1} />
                    <Typography variant="body2">({calculateOverallRating().toFixed(1)})</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingEvaluation ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Evaluations
