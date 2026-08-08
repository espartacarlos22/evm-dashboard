import { Router, type Request, type Response } from "express";

import pythonApi from "../services/pythonApi";

const router = Router();

// ----------------------------------------------------------------------
// 🟢 GET PROJECT EVM
// GET /api/projects/:project_id/evm
//
// Obtiene los indicadores consolidados del proyecto:
// BAC, PV, EV, AC, CV, SV, CPI, SPI, EAC y VAC
// ----------------------------------------------------------------------
router.get("/projects/:project_id/evm", async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;

    const response = await pythonApi.get(`/projects/${project_id}/evm`);

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Error obteniendo EVM del proyecto:",
      error?.response?.data ?? error.message,
    );

    return res.status(error?.response?.status ?? 500).json({
      detail:
        error?.response?.data?.detail ??
        "Error al obtener los indicadores EVM.",
    });
  }
});

// ----------------------------------------------------------------------
// 🟢 GET ACTIVITY EVM
// GET /api/projects/:project_id/activities/:activity_id/evm
//
// Obtiene los indicadores EVM de una actividad específica.
// ----------------------------------------------------------------------
router.get(
  "/projects/:project_id/activities/:activity_id/evm",
  async (req: Request, res: Response) => {
    try {
      const { project_id, activity_id } = req.params;

      const response = await pythonApi.get(
        `/projects/${project_id}/activities/${activity_id}/evm`,
      );

      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(
        "Error obteniendo EVM de actividad:",
        error?.response?.data ?? error.message,
      );

      return res.status(error?.response?.status ?? 500).json({
        detail:
          error?.response?.data?.detail ??
          "Error al obtener los indicadores EVM de la actividad.",
      });
    }
  },
);

export default router;