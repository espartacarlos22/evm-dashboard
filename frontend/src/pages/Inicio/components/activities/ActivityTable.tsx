import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";

import ActivityForm from "./ActivityForm";

import {
  deleteActivity,
  getProjectActivities,
  updateActivity,
  type Activity,
} from "@/api/activityApi";

// ============================================================
// PROPS
// ============================================================

interface ActivityTableProps {
  projectId: string;

  /**
   * Permite informar al componente padre cuando
   * las actividades cambian.
   *
   * Esto mantiene sincronizado el gráfico EVM.
   */
  onActivitiesChange?: (activities: Activity[]) => void;
}

// ============================================================
// CONVERSIÓN SEGURA A NÚMERO
// ============================================================

const safeNumber = (value: unknown): number => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

// ============================================================
// FORMATO MONEDA
// ============================================================

const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString("es-CO")}`;
};

// ============================================================
// CÁLCULO EVM
// ============================================================

const calculate = (activity: Activity) => {
  const bac = safeNumber(activity.bac);

  const planned = safeNumber(activity.planned_progress);

  const completed = safeNumber(activity.actual_progress);

  const ac = safeNumber(activity.actual_cost);

  // ----------------------------------------------------------
  // Planned Value
  // ----------------------------------------------------------

  const pv = (planned / 100) * bac;

  // ----------------------------------------------------------
  // Earned Value
  // ----------------------------------------------------------

  const ev = (completed / 100) * bac;

  // ----------------------------------------------------------
  // Cost Variance
  // ----------------------------------------------------------

  const cv = ev - ac;

  // ----------------------------------------------------------
  // Schedule Variance
  // ----------------------------------------------------------

  const sv = ev - pv;

  // ----------------------------------------------------------
  // Cost Performance Index
  // ----------------------------------------------------------

  const cpi = ac === 0 ? 0 : ev / ac;

  // ----------------------------------------------------------
  // Schedule Performance Index
  // ----------------------------------------------------------

  const spi = pv === 0 ? 0 : ev / pv;

  // ----------------------------------------------------------
  // Estimate at Completion
  // ----------------------------------------------------------

  const eac = cpi === 0 ? 0 : bac / cpi;

  // ----------------------------------------------------------
  // Variance at Completion
  // ----------------------------------------------------------

  const vac = bac - eac;

  return {
    pv,
    ev,
    cv,
    sv,
    cpi,
    spi,
    eac,
    vac,
  };
};

// ============================================================
// COMPONENTE
// ============================================================

const ActivityTable = ({
  projectId,
  onActivitiesChange,
}: ActivityTableProps) => {
  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================================
  // FORMULARIO NUEVA ACTIVIDAD
  // ==========================================================

  const [openForm, setOpenForm] = useState(false);

  // ==========================================================
  // FORMULARIO EDICIÓN
  // ==========================================================

  const [openEditForm, setOpenEditForm] = useState(false);

  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [savingEdit, setSavingEdit] = useState(false);

  // ==========================================================
  // CAMPOS DE EDICIÓN
  // ==========================================================

  const [editName, setEditName] = useState("");

  const [editBac, setEditBac] = useState("");

  const [editPlannedProgress, setEditPlannedProgress] = useState("");

  const [editActualProgress, setEditActualProgress] = useState("");

  const [editActualCost, setEditActualCost] = useState("");

  // ==========================================================
  // CARGAR ACTIVIDADES
  // ==========================================================

  const loadActivities = useCallback(async () => {
    if (!projectId) {
      setActivities([]);

      onActivitiesChange?.([]);

      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Consultando actividades del proyecto:", projectId);

      const data = await getProjectActivities(projectId);

      console.log("Actividades cargadas:", data);

      const normalizedActivities = Array.isArray(data) ? data : [];

      // ------------------------------------------------------
      // ACTUALIZAR ESTADO LOCAL
      // ------------------------------------------------------

      setActivities(normalizedActivities);

      // ------------------------------------------------------
      // AVISAR AL PADRE
      //
      // Esto permite actualizar el EVMChart.
      // ------------------------------------------------------

      onActivitiesChange?.(normalizedActivities);
    } catch (err) {
      console.error("Error cargando actividades:", err);

      setError("No fue posible obtener las actividades del proyecto.");

      setActivities([]);

      onActivitiesChange?.([]);
    } finally {
      setLoading(false);
    }
  }, [projectId, onActivitiesChange]);

  // ==========================================================
  // CARGAR AL MONTAR
  // ==========================================================

  useEffect(() => {
    void loadActivities();
  }, [loadActivities]);

  // ==========================================================
  // ACTIVIDAD CREADA
  // ==========================================================

  const handleActivityCreated = async () => {
    setOpenForm(false);

    await loadActivities();
  };

  // ==========================================================
  // ABRIR EDICIÓN
  // ==========================================================

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);

    setEditName(activity.name ?? "");

    setEditBac(String(activity.bac ?? ""));

    setEditPlannedProgress(String(activity.planned_progress ?? ""));

    setEditActualProgress(String(activity.actual_progress ?? ""));

    setEditActualCost(String(activity.actual_cost ?? ""));

    setOpenEditForm(true);
  };

  // ==========================================================
  // CERRAR EDICIÓN
  // ==========================================================

  const handleCloseEdit = () => {
    if (savingEdit) {
      return;
    }

    setOpenEditForm(false);

    setEditingActivity(null);
  };

  // ==========================================================
  // GUARDAR EDICIÓN
  // ==========================================================

  const handleUpdateActivity = async () => {
    if (!editingActivity) {
      return;
    }

    if (!editName.trim()) {
      setError("El nombre de la actividad es obligatorio.");

      return;
    }

    const bac = Number(editBac);

    const plannedProgress = Number(editPlannedProgress);

    const actualProgress = Number(editActualProgress);

    const actualCost = Number(editActualCost);

    // --------------------------------------------------------
    // VALIDACIÓN NUMÉRICA
    // --------------------------------------------------------

    if (
      !Number.isFinite(bac) ||
      !Number.isFinite(plannedProgress) ||
      !Number.isFinite(actualProgress) ||
      !Number.isFinite(actualCost)
    ) {
      setError("Los valores numéricos de la actividad no son válidos.");

      return;
    }

    // --------------------------------------------------------
    // VALIDACIÓN DE PORCENTAJES
    // --------------------------------------------------------

    if (
      plannedProgress < 0 ||
      plannedProgress > 100 ||
      actualProgress < 0 ||
      actualProgress > 100
    ) {
      setError("Los porcentajes de avance deben estar entre 0 y 100.");

      return;
    }

    try {
      setSavingEdit(true);
      setError("");

      await updateActivity(editingActivity.id, {
        name: editName.trim(),
        bac,
        planned_progress: plannedProgress,
        actual_progress: actualProgress,
        actual_cost: actualCost,
      });

      // ------------------------------------------------------
      // CERRAR MODAL
      // ------------------------------------------------------

      setOpenEditForm(false);

      setEditingActivity(null);

      // ------------------------------------------------------
      // RECARGAR ACTIVIDADES
      //
      // También actualiza el gráfico mediante
      // onActivitiesChange.
      // ------------------------------------------------------

      await loadActivities();
    } catch (err) {
      console.error("Error actualizando actividad:", err);

      setError("No fue posible actualizar la actividad.");
    } finally {
      setSavingEdit(false);
    }
  };

  // ==========================================================
  // ELIMINAR
  // ==========================================================

  const handleDelete = async (activityId: string) => {
    const confirmed = window.confirm("¿Deseas eliminar esta actividad?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteActivity(activityId);

      // ------------------------------------------------------
      // RECARGAR ACTIVIDADES
      //
      // También actualiza el gráfico.
      // ------------------------------------------------------

      await loadActivities();
    } catch (err) {
      console.error("Error eliminando actividad:", err);

      setError("No fue posible eliminar la actividad.");
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
        }}
      >
        <CardContent>
          {/* ==================================================
              HEADER
          ================================================== */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              sm: "center",
            }}
            spacing={2}
            mb={3}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Historial de actividades
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Consulta y administra las actividades registradas para este
                proyecto.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenForm(true)}
            >
              Nueva actividad
            </Button>
          </Stack>

          <Divider
            sx={{
              mb: 3,
            }}
          />

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
              }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading ? (
            <Box
              sx={{
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <CircularProgress />

                <Typography variant="body2" color="text.secondary">
                  Cargando actividades...
                </Typography>
              </Stack>
            </Box>
          ) : activities.length === 0 ? (
            /* =================================================
               SIN ACTIVIDADES
            ================================================= */

            <Box
              sx={{
                py: 7,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                No hay actividades registradas
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Agrega la primera actividad de este proyecto para comenzar el
                seguimiento EVM.
              </Typography>

              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  mt: 3,
                }}
                onClick={() => setOpenForm(true)}
              >
                Crear primera actividad
              </Button>
            </Box>
          ) : (
            /* =================================================
               TABLA
            ================================================= */

            <TableContainer
              sx={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <Table
                size="small"
                sx={{
                  minWidth: 1200,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Actividad</TableCell>

                    <TableCell align="right">BAC</TableCell>

                    <TableCell align="right">% Plan</TableCell>

                    <TableCell align="right">% Real</TableCell>

                    <TableCell align="right">AC</TableCell>

                    <TableCell align="right">PV</TableCell>

                    <TableCell align="right">EV</TableCell>

                    <TableCell align="right">CV</TableCell>

                    <TableCell align="right">SV</TableCell>

                    <TableCell align="right">CPI</TableCell>

                    <TableCell align="right">SPI</TableCell>

                    <TableCell align="right">EAC</TableCell>

                    <TableCell align="right">VAC</TableCell>

                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {activities.map((activity) => {
                    const result = calculate(activity);

                    return (
                      <TableRow key={activity.id} hover>
                        {/* ACTIVIDAD */}

                        <TableCell>
                          <Typography fontWeight={600} variant="body2">
                            {activity.name}
                          </Typography>
                        </TableCell>

                        {/* BAC */}

                        <TableCell align="right">
                          {formatCurrency(safeNumber(activity.bac))}
                        </TableCell>

                        {/* PLAN */}

                        <TableCell align="right">
                          {safeNumber(activity.planned_progress)}%
                        </TableCell>

                        {/* REAL */}

                        <TableCell align="right">
                          {safeNumber(activity.actual_progress)}%
                        </TableCell>

                        {/* AC */}

                        <TableCell align="right">
                          {formatCurrency(safeNumber(activity.actual_cost))}
                        </TableCell>

                        {/* PV */}

                        <TableCell align="right">
                          {formatCurrency(result.pv)}
                        </TableCell>

                        {/* EV */}

                        <TableCell align="right">
                          {formatCurrency(result.ev)}
                        </TableCell>

                        {/* CV */}

                        <TableCell align="right">
                          <Chip
                            size="small"
                            label={formatCurrency(result.cv)}
                            color={result.cv >= 0 ? "success" : "error"}
                          />
                        </TableCell>

                        {/* SV */}

                        <TableCell align="right">
                          <Chip
                            size="small"
                            label={formatCurrency(result.sv)}
                            color={result.sv >= 0 ? "success" : "error"}
                          />
                        </TableCell>

                        {/* CPI */}

                        <TableCell align="right">
                          <Chip
                            size="small"
                            label={result.cpi.toFixed(2)}
                            color={result.cpi >= 1 ? "success" : "error"}
                          />
                        </TableCell>

                        {/* SPI */}

                        <TableCell align="right">
                          <Chip
                            size="small"
                            label={result.spi.toFixed(2)}
                            color={result.spi >= 1 ? "success" : "error"}
                          />
                        </TableCell>

                        {/* EAC */}

                        <TableCell align="right">
                          {formatCurrency(result.eac)}
                        </TableCell>

                        {/* VAC */}

                        <TableCell align="right">
                          {formatCurrency(result.vac)}
                        </TableCell>

                        {/* ACCIONES */}

                        <TableCell align="center">
                          <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.5}
                          >
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(activity)}
                              title="Editar actividad"
                            >
                              <EditOutlined />
                            </IconButton>

                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(activity.id)}
                              title="Eliminar actividad"
                            >
                              <DeleteOutline />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* ======================================================
          DIALOG — NUEVA ACTIVIDAD
      ====================================================== */}

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Nueva actividad
        </DialogTitle>

        <DialogContent dividers>
          <ActivityForm
            projectId={projectId}
            onCancel={() => setOpenForm(false)}
            onSuccess={handleActivityCreated}
          />
        </DialogContent>
      </Dialog>

      {/* ======================================================
          DIALOG — EDITAR ACTIVIDAD
      ====================================================== */}

      <Dialog
        open={openEditForm}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Editar actividad
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Actualiza los valores de planificación, avance y costos de esta
            actividad.
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5}>
            {/* NOMBRE */}

            <TextField
              fullWidth
              label="Nombre de la actividad"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
              required
            />

            {/* BAC */}

            <TextField
              fullWidth
              type="number"
              label="BAC — Presupuesto total planificado"
              value={editBac}
              onChange={(event) => setEditBac(event.target.value)}
              inputProps={{
                min: 0,
              }}
              required
            />

            {/* PLAN */}

            <TextField
              fullWidth
              type="number"
              label="% avance planificado"
              value={editPlannedProgress}
              onChange={(event) => setEditPlannedProgress(event.target.value)}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              required
            />

            {/* REAL */}

            <TextField
              fullWidth
              type="number"
              label="% avance real completado"
              value={editActualProgress}
              onChange={(event) => setEditActualProgress(event.target.value)}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              required
            />

            {/* AC */}

            <TextField
              fullWidth
              type="number"
              label="AC — Costo real incurrido"
              value={editActualCost}
              onChange={(event) => setEditActualCost(event.target.value)}
              inputProps={{
                min: 0,
              }}
              required
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Button onClick={handleCloseEdit} disabled={savingEdit}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdateActivity}
            disabled={savingEdit || !editName.trim()}
          >
            {savingEdit ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivityTable;