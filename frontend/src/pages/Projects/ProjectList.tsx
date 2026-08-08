import { useCallback, useEffect, useState, type ReactElement } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  Add,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { deleteProject, getProjects, type Project } from "@/api/projectApi";

const ProjectList = (): ReactElement => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ============================================================
  // OBTENER PROYECTOS
  // ============================================================

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      console.log("data: ", data);

      setProjects(data);
    } catch (err: any) {
      console.error("Error obteniendo proyectos:", err);

      const message =
        err?.response?.data?.detail ?? "No fue posible obtener los proyectos.";

      setError(
        typeof message === "string"
          ? message
          : "Error obteniendo los proyectos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================
  // CARGAR AL INICIAR
  // ============================================================

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  // ============================================================
  // ELIMINAR PROYECTO
  // ============================================================

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este proyecto?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(projectId);
      setError("");

      await deleteProject(projectId);

      // Actualizamos inmediatamente la lista
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId),
      );
    } catch (err: any) {
      console.error("Error eliminando proyecto:", err);

      const message =
        err?.response?.data?.detail ?? "No fue posible eliminar el proyecto.";

      setError(
        typeof message === "string" ? message : "Error eliminando el proyecto.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        mx: "auto",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

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
            textAlign: "left",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Proyectos
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              textAlign: "left",
            }}
          >
            Gestiona tus proyectos y su desempeño mediante Earned Value
            Management.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/projects/new")}
        >
          Nuevo proyecto
        </Button>
      </Stack>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* ======================================================
          SIN PROYECTOS
      ====================================================== */}

      {projects.length === 0 ? (
        <Card>
          <CardContent>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                py: 6,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                No hay proyectos registrados
              </Typography>

              <Typography color="text.secondary">
                Crea tu primer proyecto para comenzar a gestionar sus
                indicadores EVM.
              </Typography>

              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/projects/new")}
              >
                Crear proyecto
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        /* ====================================================
           LISTA DE PROYECTOS
        ==================================================== */

        <Stack spacing={2}>
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                width: "100%",
                borderRadius: 2,
              }}
            >
              <CardContent
                sx={{
                  "&:last-child": {
                    pb: 2,
                  },
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  justifyContent="space-between"
                  alignItems={{
                    xs: "stretch",
                    md: "center",
                  }}
                  spacing={2}
                  sx={{
                    width: "100%",
                  }}
                >
                  {/* ==========================================
                      INFORMACIÓN DEL PROYECTO
                  ========================================== */}

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      {project.name}
                    </Typography>

                    {project.description && (
                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          textAlign: "left",
                        }}
                      >
                        {project.description}
                      </Typography>
                    )}

                    {project.status && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          textAlign: "left",
                        }}
                      >
                        Estado: {project.status}
                      </Typography>
                    )}
                  </Box>

                  {/* ==========================================
                      ACCIONES
                  ========================================== */}

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent={{
                      xs: "flex-start",
                      md: "flex-end",
                    }}
                    sx={{
                      flexShrink: 0,
                      minWidth: {
                        md: 144,
                      },
                    }}
                  >
                    <IconButton
                      title="Ver proyecto"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <VisibilityOutlined />
                    </IconButton>

                    <IconButton
                      title="Editar proyecto"
                      onClick={() => navigate(`/projects/${project.id}/edit`)}
                    >
                      <EditOutlined />
                    </IconButton>

                    <IconButton
                      color="error"
                      title="Eliminar proyecto"
                      disabled={deletingId === project.id}
                      onClick={() => void handleDelete(project.id)}
                    >
                      {deletingId === project.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteOutline />
                      )}
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProjectList;
