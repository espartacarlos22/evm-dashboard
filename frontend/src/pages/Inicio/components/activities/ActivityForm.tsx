import {
  useState,
  type FormEvent,
  type ReactElement,
} from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  createActivity,
} from "@/api/activityApi";

interface ActivityFormProps {
  projectId: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const ActivityForm = ({
  projectId,
  onCancel,
  onSuccess,
}: ActivityFormProps): ReactElement => {

  const [name, setName] = useState("");
  const [bac, setBac] = useState("");
  const [plannedProgress, setPlannedProgress] =
    useState("");
  const [actualProgress, setActualProgress] =
    useState("");
  const [actualCost, setActualCost] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "El nombre de la actividad es obligatorio."
      );
      return;
    }

    if (!projectId) {
      setError(
        "No se encontró el proyecto asociado."
      );
      return;
    }

    const planned = Number(plannedProgress);
    const actual = Number(actualProgress);

    if (planned < 0 || planned > 100) {
      setError(
        "El avance planificado debe estar entre 0 y 100."
      );
      return;
    }

    if (actual < 0 || actual > 100) {
      setError(
        "El avance real debe estar entre 0 y 100."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("Este es el proyecto: ", projectId);

      await createActivity({
        project_id: projectId,
        name: name.trim(),
        bac: Number(bac),
        planned_progress: planned,
        actual_progress: actual,
        actual_cost: Number(actualCost),
      });

      // Limpiar formulario
      setName("");
      setBac("");
      setPlannedProgress("");
      setActualProgress("");
      setActualCost("");

      // Avisar al componente padre
      onSuccess?.();

    } catch (err: any) {
      console.error(
        "Error creando actividad:",
        err
      );

      const message =
        err?.response?.data?.detail ??
        "No fue posible crear la actividad.";

      setError(
        typeof message === "string"
          ? message
          : "Error de validación."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Nueva actividad
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>

            {/* Nombre */}

            <TextField
              label="Nombre de la actividad"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              fullWidth
              required
            />

            {/* BAC */}

            <TextField
              label="BAC — Presupuesto total planificado"
              type="number"
              value={bac}
              onChange={(event) =>
                setBac(event.target.value)
              }
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
              }}
            />

            {/* Avance planificado */}

            <TextField
              label="% avance planificado"
              type="number"
              value={plannedProgress}
              onChange={(event) =>
                setPlannedProgress(
                  event.target.value
                )
              }
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 100,
                  step: "0.01",
                },
              }}
            />

            {/* Avance real */}

            <TextField
              label="% avance real completado"
              type="number"
              value={actualProgress}
              onChange={(event) =>
                setActualProgress(
                  event.target.value
                )
              }
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 100,
                  step: "0.01",
                },
              }}
            />

            {/* AC */}

            <TextField
              label="AC — Costo real incurrido"
              type="number"
              value={actualCost}
              onChange={(event) =>
                setActualCost(
                  event.target.value
                )
              }
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
              }}
            />

            {/* Botones */}

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading
                  ? "Guardando..."
                  : "Guardar actividad"}
              </Button>
            </Box>

          </Stack>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ActivityForm;