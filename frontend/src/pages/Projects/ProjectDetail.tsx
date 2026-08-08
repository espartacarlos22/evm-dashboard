import { useEffect, useState, type ReactElement } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useNavigate, useParams } from "react-router-dom";

import {
  getProject,
  getProjectEVM,
  type Project,
  type ProjectEVM,
} from "@/api/projectApi";

import { getProjectActivities, type Activity } from "@/api/activityApi";

import EVMCards from "../Inicio/components/evm/EVMCards";
import EVMStatus from "../Inicio/components/evm/EVMStatus";
import EVMChart from "../Inicio/components/evm/EVMChart";
import ActivityTable from "../Inicio/components/activities/ActivityTable";

// ============================================================
// VALOR NUMÉRICO SEGURO
// ============================================================

const safeNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

// ============================================================
// COMPONENTE
// ============================================================

const ProjectDetail = (): ReactElement => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  // ============================================================
  // ESTADOS
  // ============================================================

  const [project, setProject] = useState<Project | null>(null);

  const [evm, setEvm] = useState<ProjectEVM | null>(null);

  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ============================================================
  // CARGAR PROYECTO + EVM + ACTIVIDADES
  // ============================================================

  useEffect(() => {
    const loadProject = async () => {
      // --------------------------------------------------------
      // VALIDAR ID
      // --------------------------------------------------------

      if (!id) {
        setError("No se encontró el identificador del proyecto en la URL.");

        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("==========================================");

        console.log("Cargando información del proyecto:", id);

        // ------------------------------------------------------
        // PROYECTO
        // ------------------------------------------------------

        const projectResponse = await getProject(id);

        console.log("Proyecto:", projectResponse);

        setProject(projectResponse);

        // ------------------------------------------------------
        // EVM
        // ------------------------------------------------------

        const evmResponse = await getProjectEVM(id);

        console.log("EVM:", evmResponse);

        setEvm(evmResponse);

        // ------------------------------------------------------
        // ACTIVIDADES
        // ------------------------------------------------------

        console.log("Consultando actividades del proyecto:", id);

        const activitiesResponse = await getProjectActivities(id);

        console.log("Actividades recibidas:", activitiesResponse);

        if (Array.isArray(activitiesResponse)) {
          setActivities(activitiesResponse);
        } else {
          setActivities([]);
        }

        console.log("==========================================");
      } catch (err) {
        console.error("Error cargando proyecto:", err);

        setError("No fue posible cargar la información del proyecto.");

        setProject(null);
        setEvm(null);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [id]);

  // ============================================================
  // SIN ID
  // ============================================================

  if (!id) {
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
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={700} mb={2}>
              Proyecto no encontrado
            </Typography>

            <Typography color="text.secondary" mb={3}>
              No se encontró el identificador del proyecto en la URL.
            </Typography>

            <Button
              variant="contained"
              startIcon={<ArrowBackOutlinedIcon />}
              onClick={() => navigate("/projects")}
            >
              Volver a proyectos
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">Cargando proyecto...</Typography>
      </Box>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !project) {
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
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "No se encontró el proyecto."}
        </Alert>

        <Button
          variant="contained"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/projects")}
        >
          Volver a proyectos
        </Button>
      </Box>
    );
  }

  // ============================================================
  // NORMALIZAR EVM
  // ============================================================

  const bac = safeNumber(evm?.bac);
  const pv = safeNumber(evm?.pv);
  const ev = safeNumber(evm?.ev);
  const ac = safeNumber(evm?.ac);

  const cv = safeNumber(evm?.cv);
  const sv = safeNumber(evm?.sv);

  const cpi = safeNumber(evm?.cpi);
  const spi = safeNumber(evm?.spi);

  const eac = safeNumber(evm?.eac);
  const vac = safeNumber(evm?.vac);

  // ============================================================
  // INTERPRETACIONES
  // ============================================================

  const cpiMessage =
    cpi >= 1
      ? "El proyecto está bajo presupuesto: se está obteniendo más valor por cada unidad de costo."
      : "El proyecto está sobre presupuesto: se está gastando más de lo que se está obteniendo en valor.";

  const spiMessage =
    spi >= 1
      ? "El proyecto está adelantado respecto al cronograma planificado."
      : "El proyecto está atrasado respecto al cronograma planificado.";

  // ============================================================
  // RENDER
  // ============================================================

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
            {project.name}
          </Typography>

          <Typography color="text.secondary">
            {project.description ||
              "Análisis de desempeño mediante Earned Value Management"}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => navigate(`/projects/${id}/edit`)}
        >
          Editar proyecto
        </Button>
      </Stack>

      {/* ======================================================
          ESTADO EVM
      ====================================================== */}

      <Box mb={3}>
        <EVMStatus cpi={cpi} spi={spi} />
      </Box>

      {/* ======================================================
          INDICADORES EVM
      ====================================================== */}

      <Box mb={4}>
        <EVMCards
          bac={bac}
          pv={pv}
          ev={ev}
          ac={ac}
          cv={cv}
          sv={sv}
          cpi={cpi}
          spi={spi}
          eac={eac}
          vac={vac}
        />
      </Box>

      {/* ======================================================
          GRÁFICA + ACTIVIDADES
      ====================================================== */}

      <Stack spacing={3}>
        {/* ----------------------------------------------------
            GRÁFICA EVM

            Utilizamos las actividades obtenidas desde:
            GET /api/activities/project/:project_id
        ---------------------------------------------------- */}

        <EVMChart activities={activities} loading={loading} />

        {/* ----------------------------------------------------
            TABLA DE ACTIVIDADES

            ActivityTable también consulta las actividades
            del proyecto y permite crear/eliminar.
        ---------------------------------------------------- */}

        <ActivityTable projectId={id} />
      </Stack>

      {/* ======================================================
          INTERPRETACIÓN
      ====================================================== */}

      <Divider
        sx={{
          my: 4,
        }}
      />

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={3}>
            Interpretación EVM
          </Typography>

          <Stack spacing={2}>
            {/* ------------------------------------------------
                CPI
            ------------------------------------------------ */}

            <Box>
              <Typography fontWeight={700} mb={0.5}>
                CPI — Desempeño de costos
              </Typography>

              <Typography color="text.secondary">{cpiMessage}</Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                CPI actual: <strong>{cpi.toFixed(2)}</strong>
              </Typography>
            </Box>

            {/* ------------------------------------------------
                SPI
            ------------------------------------------------ */}

            <Box>
              <Typography fontWeight={700} mb={0.5}>
                SPI — Desempeño del cronograma
              </Typography>

              <Typography color="text.secondary">{spiMessage}</Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                SPI actual: <strong>{spi.toFixed(2)}</strong>
              </Typography>
            </Box>

            {/* ------------------------------------------------
                CV
            ------------------------------------------------ */}

            <Box>
              <Typography fontWeight={700} mb={0.5}>
                CV — Variación de costos
              </Typography>

              <Typography color="text.secondary">
                {cv >= 0
                  ? "El proyecto presenta una variación favorable de costos."
                  : "El proyecto presenta una variación desfavorable de costos."}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                CV: <strong>{cv.toFixed(2)}</strong>
              </Typography>
            </Box>

            {/* ------------------------------------------------
                SV
            ------------------------------------------------ */}

            <Box>
              <Typography fontWeight={700} mb={0.5}>
                SV — Variación del cronograma
              </Typography>

              <Typography color="text.secondary">
                {sv >= 0
                  ? "El proyecto presenta una variación favorable respecto al cronograma."
                  : "El proyecto presenta una variación desfavorable respecto al cronograma."}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                SV: <strong>{sv.toFixed(2)}</strong>
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectDetail;