import { Router, type Request, type Response } from "express";

import pythonApi from "../services/pythonApi";

const router = Router();

// ----------------------------------------------------------------------
// 🟢 GET ACTIVITIES
// GET /api/activities
// ----------------------------------------------------------------------
router.get("/activities", async (req: Request, res: Response) => {
  try {
    const response = await pythonApi.get("/activities/", {
      params: req.query,
    });

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Error obteniendo actividades:",
      error?.response?.data ?? error.message,
    );

    return res.status(error?.response?.status ?? 500).json({
      detail:
        error?.response?.data?.detail ?? "Error al obtener las actividades.",
    });
  }
});

// ----------------------------------------------------------------------
// 🟢 CREATE ACTIVITY
// POST /api/activities
// ----------------------------------------------------------------------
router.post("/activities", async (req: Request, res: Response) => {
  try {
    console.log("req.body: ", req.body);
    const response = await pythonApi.post("/activities/", req.body);

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Error creando actividad:",
      error?.response?.data ?? error.message,
    );

    return res.status(error?.response?.status ?? 500).json({
      detail: error?.response?.data?.detail ?? "Error al crear la actividad.",
    });
  }
});

// ----------------------------------------------------------------------
// 🟢 GET ACTIVITY
// GET /api/activities/:activity_id
// ----------------------------------------------------------------------
router.get("/activities/:activity_id", async (req: Request, res: Response) => {
  try {
    const { activity_id } = req.params;

    const response = await pythonApi.get(`/activities/${activity_id}`);

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Error obteniendo actividad:",
      error?.response?.data ?? error.message,
    );

    return res.status(error?.response?.status ?? 500).json({
      detail: error?.response?.data?.detail ?? "Error al obtener la actividad.",
    });
  }
});

// ----------------------------------------------------------------------
// 🟢 UPDATE ACTIVITY
// PATCH /api/activities/:activity_id
// ----------------------------------------------------------------------
router.patch(
  "/activities/:activity_id",
  async (req: Request, res: Response) => {
    try {
      const { activity_id } = req.params;

      const response = await pythonApi.patch(
        `/activities/${activity_id}`,
        req.body,
      );

      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(
        "Error actualizando actividad:",
        error?.response?.data ?? error.message,
      );

      return res.status(error?.response?.status ?? 500).json({
        detail:
          error?.response?.data?.detail ?? "Error al actualizar la actividad.",
      });
    }
  },
);

// ----------------------------------------------------------------------
// 🔴 DELETE ACTIVITY
// DELETE /api/activities/:activity_id
// ----------------------------------------------------------------------
router.delete(
  "/activities/:activity_id",
  async (req: Request, res: Response) => {
    try {
      const { activity_id } = req.params;

      const response = await pythonApi.delete(`/activities/${activity_id}`);

      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(
        "Error eliminando actividad:",
        error?.response?.data ?? error.message,
      );

      return res.status(error?.response?.status ?? 500).json({
        detail:
          error?.response?.data?.detail ?? "Error al eliminar la actividad.",
      });
    }
  },
);

// ----------------------------------------------------------------------
// 🟢 GET PROJECT ACTIVITIES
// GET /api/activities/project/:project_id
// ----------------------------------------------------------------------
router.get(
  "/activities/project/:project_id",
  async (req: Request, res: Response) => {
    try {
      const { project_id } = req.params;

      const response = await pythonApi.get(`/activities/project/${project_id}`);

      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(
        "Error obteniendo actividades del proyecto:",
        error?.response?.data ?? error.message,
      );

      return res.status(error?.response?.status ?? 500).json({
        detail:
          error?.response?.data?.detail ??
          "Error al obtener las actividades del proyecto.",
      });
    }
  },
);

export default router;
