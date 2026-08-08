import { useEffect, useState, type FormEvent, type ReactElement } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useNavigate, useParams } from "react-router-dom";

import { createProject, getProject, updateProject } from "@/api/projectApi";

const ProjectForm = (): ReactElement => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  /*
   * ============================================================
   * ESTADO DEL FORMULARIO
   * ============================================================
   */

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [loadingProject, setLoadingProject] = useState(false);

  const [error, setError] = useState("");

  /*
   * ============================================================
   * MODO DEL FORMULARIO
   * ============================================================
   *
   * /projects/new
   *      → crear
   *
   * /projects/:id/edit
   *      → editar
   */

  const isEditMode = Boolean(id);

  /*
   * ============================================================
   * CARGAR PROYECTO PARA EDICIÓN
   * ============================================================
   */

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProject = async () => {
      try {
        setLoadingProject(true);
        setError("");

        const project = await getProject(id);

        setName(project.name ?? "");

        setDescription(project.description ?? "");
      } catch (err: any) {
        console.error("Error cargando proyecto:", err);

        console.error("Respuesta backend:", err?.response?.data);

        const message =
          err?.response?.data?.detail ?? "No fue posible cargar el proyecto.";

        setError(
          typeof message === "string" ? message : "Error cargando el proyecto.",
        );
      } finally {
        setLoadingProject(false);
      }
    };

    loadProject();
  }, [id]);

  /*
   * ============================================================
   * GUARDAR PROYECTO
   * ============================================================
   */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    /*
     * Validación
     */

    if (!name.trim()) {
      setError("El nombre del proyecto es obligatorio.");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        description: description.trim(),
      };

      /*
       * CREAR
       */

      if (!isEditMode) {
        const project = await createProject(payload);

        console.log("Proyecto creado:", project);

        /*
         * Después de crear el proyecto
         * vamos directamente a su detalle.
         */

        navigate(`/projects/${project.id}`);

        return;
      }

      /*
       * ACTUALIZAR
       */

      if (id) {
        const project = await updateProject(id, payload);

        console.log("Proyecto actualizado:", project);

        navigate(`/projects/${id}`);
      }
    } catch (err: any) {
      console.error("Error guardando proyecto:", err);

      console.error("Respuesta backend:", err?.response?.data);

      const message =
        err?.response?.data?.detail ?? "No fue posible guardar el proyecto.";

      setError(typeof message === "string" ? message : "Error de validación.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * CARGANDO PROYECTO PARA EDICIÓN
   * ============================================================
   */

  if (loadingProject) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Card>
          <CardContent>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{
                py: 8,
              }}
            >
              <CircularProgress />

              <Typography color="text.secondary">
                Cargando proyecto...
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

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
        <Box>
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate("/projects")}
            sx={{
              mb: 1,
            }}
          >
            Volver a proyectos
          </Button>

          <Typography variant="h4" fontWeight={700}>
            {isEditMode ? "Editar proyecto" : "Nuevo proyecto"}
          </Typography>

          <Typography color="text.secondary">
            {isEditMode
              ? "Actualiza la información del proyecto."
              : "Registra un nuevo proyecto para comenzar el análisis EVM."}
          </Typography>
        </Box>
      </Stack>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
          }}
        >
          {error}
        </Alert>
      )}

      {/* =====================================================
          FORMULARIO
      ===================================================== */}

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Nombre */}

              <TextField
                label="Nombre del proyecto"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                required
                disabled={loading}
                placeholder="Ej. Implementación ERP"
              />

              {/* Descripción */}

              <TextField
                label="Descripción"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                rows={4}
                fullWidth
                disabled={loading}
                placeholder="Descripción del proyecto..."
              />

              {/* Información EVM */}

              <Alert severity="info">
                El presupuesto BAC se registra a nivel de actividad. El sistema
                calculará automáticamente el BAC consolidado del proyecto a
                partir de sus actividades.
              </Alert>

              {/* Botones */}

              <Stack
                direction={{
                  xs: "column-reverse",
                  sm: "row",
                }}
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackOutlinedIcon />}
                  onClick={() => navigate("/projects")}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <SaveOutlinedIcon />
                    )
                  }
                  disabled={loading}
                >
                  {loading
                    ? "Guardando..."
                    : isEditMode
                      ? "Guardar cambios"
                      : "Crear proyecto"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectForm;
