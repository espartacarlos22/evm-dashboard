import type { ReactElement } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { Activity } from "@/api/activityApi";

// ============================================================
// PROPS
// ============================================================

interface EVMChartProps {
  activities: Activity[];
  loading?: boolean;
}

// ============================================================
// CONVERSIÓN SEGURA A NÚMERO
// ============================================================

const safeNumber = (value: unknown): number => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

// ============================================================
// COLORES PARA LAS ACTIVIDADES
// ============================================================

const ACTIVITY_COLORS = [
  "#1976D2", // Azul
  "#2E7D32", // Verde
  "#ED6C02", // Naranja
  "#9C27B0", // Morado
  "#D32F2F", // Rojo
  "#00897B", // Verde azulado
  "#6D4C41", // Café
  "#5C6BC0", // Índigo
  "#C2185B", // Rosa
  "#0288D1", // Azul claro
];

// ============================================================
// COMPONENTE
// ============================================================

const EVMChart = ({
  activities,
  loading = false,
}: EVMChartProps): ReactElement => {
  // ============================================================
  // PREPARAR DATOS DEL GRÁFICO
  // ============================================================

  const data = activities.map((activity, index) => {
    // ----------------------------------------------------------
    // DATOS DE LA ACTIVIDAD
    // ----------------------------------------------------------

    const bac = safeNumber(activity.bac);

    const plannedProgress = safeNumber(activity.planned_progress);

    const actualProgress = safeNumber(activity.actual_progress);

    const actualCost = safeNumber(activity.actual_cost);

    // ----------------------------------------------------------
    // CÁLCULOS EVM
    // ----------------------------------------------------------

    // Planned Value
    const pv = (plannedProgress / 100) * bac;

    // Earned Value
    const ev = (actualProgress / 100) * bac;

    // Actual Cost
    const ac = actualCost;

    // ----------------------------------------------------------
    // COLOR DE LA ACTIVIDAD
    // ----------------------------------------------------------

    const color = ACTIVITY_COLORS[index % ACTIVITY_COLORS.length];

    return {
      activity: activity.name,

      PV: pv,
      EV: ev,
      AC: ac,

      color,
    };
  });

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 430,
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            mb: 3,
          }}
        >
          PV vs EV vs AC por actividad
        </Typography>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <Box
            sx={{
              height: 340,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : activities.length === 0 ? (
          /* ===================================================
             SIN ACTIVIDADES
          =================================================== */

          <Box
            sx={{
              height: 340,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Alert severity="info">
              Este proyecto todavía no tiene actividades.
            </Alert>
          </Box>
        ) : (
          /* ===================================================
             GRÁFICO
          =================================================== */

          <Box
            sx={{
              width: "100%",
              height: 340,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 20,
                  left: 20,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="activity"
                  angle={-15}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />

                <YAxis
                  label={{
                    value: "Valor",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    `$${safeNumber(value).toLocaleString("es-CO")}`
                  }
                />

                <Legend />

                {/* =================================================
                    PLANNED VALUE
                ================================================= */}

                <Bar dataKey="PV" name="Planned Value">
                  {data.map((entry, index) => (
                    <Cell key={`pv-${index}`} fill={entry.color} />
                  ))}
                </Bar>

                {/* =================================================
                    EARNED VALUE
                ================================================= */}

                <Bar dataKey="EV" name="Earned Value">
                  {data.map((entry, index) => (
                    <Cell key={`ev-${index}`} fill={entry.color} />
                  ))}
                </Bar>

                {/* =================================================
                    ACTUAL COST
                ================================================= */}

                <Bar dataKey="AC" name="Actual Cost">
                  {data.map((entry, index) => (
                    <Cell key={`ac-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EVMChart;