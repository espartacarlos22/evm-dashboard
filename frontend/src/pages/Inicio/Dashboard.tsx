import { useEffect, useMemo, useState, type ReactElement } from "react";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { getProjects, getProjectEVM, type Project } from "@/api/projectApi";

// ============================================================
// HELPERS
// ============================================================

const safeNumber = (value: unknown): number => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
};

// ============================================================
// FORMATO NÚMERO
// ============================================================

const formatNumber = (
  value: number | null | undefined,
  decimals = 2,
): string => {
  if (value === null || value === undefined) {
    return "—";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "—";
  }

  return numericValue.toFixed(decimals);
};

// ============================================================
// FORMATO MONETARIO
// ============================================================

const formatMoney = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return "—";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "—";
  }

  return `$${numericValue.toLocaleString("es-CO")}`;
};

// ============================================================
// ESTADO DEL PROYECTO
// ============================================================

const getProjectStatus = (
  cpi: number | null | undefined,
  spi: number | null | undefined,
): {
  label: string;
  color: "success" | "warning" | "error" | "default";
} => {
  // ----------------------------------------------------------
  // Sin información EVM
  // ----------------------------------------------------------

  if (cpi == null || spi == null) {
    return {
      label: "Sin datos EVM",
      color: "default",
    };
  }

  // ----------------------------------------------------------
  // Buen desempeño
  // ----------------------------------------------------------

  if (cpi >= 1 && spi >= 1) {
    return {
      label: "En ejecución",
      color: "success",
    };
  }

  // ----------------------------------------------------------
  // Algún indicador desfavorable
  // ----------------------------------------------------------

  return {
    label: "En riesgo",
    color: "warning",
  };
};

// ============================================================
// TIPO INTERNO DEL DASHBOARD
// ============================================================

interface DashboardProject extends Project {
  bac: number | null;
  pv: number | null;
  ev: number | null;
  ac: number | null;
  cv: number | null;
  sv: number | null;
  cpi: number | null;
  spi: number | null;
  eac: number | null;
  vac: number | null;
}

// ============================================================
// DASHBOARD
// ============================================================

const Dashboard = (): ReactElement => {
  const navigate = useNavigate();

  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [projects, setProjects] = useState<DashboardProject[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================================
  // OBTENER PROYECTOS + EVM
  // ==========================================================

  const loadProjects = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      // ------------------------------------------------------
      // OBTENER PROYECTOS
      // ------------------------------------------------------

      const projectsData = await getProjects();

      // ------------------------------------------------------
      // OBTENER EVM DE CADA PROYECTO
      // ------------------------------------------------------

      const projectsWithEVM = await Promise.all(
        projectsData.map(async (project): Promise<DashboardProject> => {
          try {
            const evm = await getProjectEVM(project.id);

            return {
              ...project,

              bac: evm.bac,
              pv: evm.pv,
              ev: evm.ev,
              ac: evm.ac,

              cv: evm.cv,
              sv: evm.sv,

              cpi: evm.cpi,
              spi: evm.spi,

              eac: evm.eac,
              vac: evm.vac,
            };
          } catch (err) {
            console.warn(
              `No fue posible obtener EVM para el proyecto ${project.id}`,
              err,
            );

            // ------------------------------------------------
            // Si el proyecto no tiene EVM todavía
            // ------------------------------------------------

            return {
              ...project,

              bac: project.bac ?? null,

              pv: project.pv ?? null,

              ev: project.ev ?? null,

              ac: project.ac ?? null,

              cv: project.cv ?? null,

              sv: project.sv ?? null,

              cpi: project.cpi ?? null,

              spi: project.spi ?? null,

              eac: project.eac ?? null,

              vac: project.vac ?? null,
            };
          }
        }),
      );

      setProjects(projectsWithEVM);
    } catch (err) {
      console.error("Error obteniendo proyectos:", err);

      setError("No fue posible cargar los proyectos.");

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // CARGAR AL ENTRAR
  // ==========================================================

  useEffect(() => {
    void loadProjects();
  }, []);

  // ==========================================================
  // MÉTRICAS CONSOLIDADAS
  // ==========================================================

  const metrics = useMemo(() => {
    // --------------------------------------------------------
    // TOTAL PROYECTOS
    // --------------------------------------------------------

    const totalProjects = projects.length;

    // --------------------------------------------------------
    // PRESUPUESTO TOTAL
    // --------------------------------------------------------

    const totalBAC = projects.reduce(
      (total, project) => total + safeNumber(project.bac),
      0,
    );

    // --------------------------------------------------------
    // VALOR GANADO TOTAL
    // --------------------------------------------------------

    const totalEV = projects.reduce(
      (total, project) => total + safeNumber(project.ev),
      0,
    );

    // --------------------------------------------------------
    // COSTO REAL TOTAL
    // --------------------------------------------------------

    const totalAC = projects.reduce(
      (total, project) => total + safeNumber(project.ac),
      0,
    );

    // --------------------------------------------------------
    // PROYECTOS EN RIESGO
    // --------------------------------------------------------

    const projectsAtRisk = projects.filter((project) => {
      if (project.cpi == null || project.spi == null) {
        return false;
      }

      return project.cpi < 1 || project.spi < 1;
    }).length;

    // --------------------------------------------------------
    // PROYECTOS EN EJECUCIÓN
    // --------------------------------------------------------

    const projectsRunning = projects.filter((project) => {
      if (project.cpi == null || project.spi == null) {
        return false;
      }

      return project.cpi >= 1 && project.spi >= 1;
    }).length;

    // --------------------------------------------------------
    // PROYECTOS SIN DATOS EVM
    // --------------------------------------------------------

    const projectsWithoutData = projects.filter(
      (project) => project.cpi == null || project.spi == null,
    ).length;

    // --------------------------------------------------------
    // VARIACIÓN TOTAL DE COSTOS
    // --------------------------------------------------------

    const totalCV = projects.reduce(
      (total, project) => total + safeNumber(project.cv),
      0,
    );

    return {
      totalProjects,

      totalBAC,

      totalEV,

      totalAC,

      totalCV,

      projectsAtRisk,

      projectsRunning,

      projectsWithoutData,
    };
  }, [projects]);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />

          <Typography color="text.secondary">Cargando dashboard...</Typography>
        </Stack>
      </Box>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1600,
        mx: "auto",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          EVM Dashboard
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Resumen general del desempeño de tus proyectos.
        </Typography>
      </Box>

      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* ====================================================
          TARJETAS PRINCIPALES
      ==================================================== */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* ------------------------------------------------
            PROYECTOS
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Proyectos
              </Typography>

              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {metrics.totalProjects}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Proyectos registrados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------------------------------------
            PRESUPUESTO TOTAL
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Presupuesto Total
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  mt: 1,
                  wordBreak: "break-word",
                }}
              >
                {formatMoney(metrics.totalBAC)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                BAC consolidado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------------------------------------
            VALOR GANADO
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Valor Ganado
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  mt: 1,
                  wordBreak: "break-word",
                }}
              >
                {formatMoney(metrics.totalEV)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                EV consolidado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------------------------------------
            PROYECTOS EN RIESGO
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Proyectos en Riesgo
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  mt: 1,
                }}
              >
                {metrics.projectsAtRisk}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                CPI o SPI inferior a 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ====================================================
          SEGUNDA FILA DE INFORMACIÓN
      ==================================================== */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* ------------------------------------------------
            COSTO REAL
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Costo Real
              </Typography>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                {formatMoney(metrics.totalAC)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                AC consolidado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------------------------------------
            VARIACIÓN COSTOS
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Variación de Costos
              </Typography>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                {formatMoney(metrics.totalCV)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                CV consolidado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------------------------------------
            PROYECTOS SIN DATOS
        ------------------------------------------------ */}

        <Grid
          size={{
            xs: 12,
            sm: 12,
            lg: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Sin datos EVM
              </Typography>

              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {metrics.projectsWithoutData}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Proyectos pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ====================================================
          CONTENIDO PRINCIPAL
      ==================================================== */}

      <Grid container spacing={3}>
        {/* ==================================================
            ESTADO DE PROYECTOS
        ================================================== */}

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Estado de proyectos
              </Typography>

              <Stack spacing={2}>
                {/* ------------------------------------------
                    EN EJECUCIÓN
                ------------------------------------------ */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>🟢 En ejecución</Typography>

                  <Chip
                    label={metrics.projectsRunning}
                    color="success"
                    size="small"
                  />
                </Box>

                {/* ------------------------------------------
                    EN RIESGO
                ------------------------------------------ */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>🟡 En riesgo</Typography>

                  <Chip
                    label={metrics.projectsAtRisk}
                    color="warning"
                    size="small"
                  />
                </Box>

                {/* ------------------------------------------
                    SIN DATOS
                ------------------------------------------ */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>⚪ Sin datos EVM</Typography>

                  <Chip label={metrics.projectsWithoutData} size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ==================================================
            PROYECTOS RECIENTES
        ================================================== */}

        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <Card>
            <CardContent>
              {/* --------------------------------------------
                  TÍTULO
              -------------------------------------------- */}

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Proyectos recientes
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Resumen del desempeño de los proyectos registrados.
                </Typography>
              </Box>

              {/* --------------------------------------------
                  SIN PROYECTOS
              -------------------------------------------- */}

              {projects.length === 0 ? (
                <Box
                  sx={{
                    py: 5,
                    textAlign: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    No hay proyectos registrados.
                  </Typography>
                </Box>
              ) : (
                <Stack>
                  {projects.map((project) => {
                    const status = getProjectStatus(project.cpi, project.spi);

                    return (
                      <Box
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          p: 2,

                          borderBottom: "1px solid",

                          borderColor: "divider",

                          cursor: "pointer",

                          transition: "background-color 0.2s",

                          "&:hover": {
                            bgcolor: "action.hover",
                          },

                          "&:last-child": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        {/* ------------------------------
                              INFORMACIÓN
                          ------------------------------ */}

                        <Box
                          sx={{
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          <Typography fontWeight={600} noWrap>
                            {project.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 0.5,
                            }}
                          >
                            CPI: {formatNumber(project.cpi)}
                            {" · "}
                            SPI: {formatNumber(project.spi)}
                          </Typography>
                        </Box>

                        {/* ------------------------------
                              ESTADO
                          ------------------------------ */}

                        <Chip
                          label={status.label}
                          color={status.color}
                          size="small"
                        />
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;