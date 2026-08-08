import {
  Router,
  type Request,
  type Response,
} from "express";

import pythonApi from "../services/pythonApi";

const router = Router();


// ----------------------------------------------------------------------
// 🟢 GET PROJECTS
// GET /api/projects
// ----------------------------------------------------------------------
router.get(
  "/projects",
  async (req: Request, res: Response) => {
    try {
      const response = await pythonApi.get(
        "/projects/",
        {
          params: req.query,
        }
      );

      return res.status(response.status).json(
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error obteniendo proyectos:",
        error?.response?.data ?? error.message
      );

      return res.status(
        error?.response?.status ?? 500
      ).json({
        detail:
          error?.response?.data?.detail ??
          "Error al obtener los proyectos.",
      });
    }
  }
);


// ----------------------------------------------------------------------
// 🟢 CREATE PROJECT
// POST /api/projects
// ----------------------------------------------------------------------
router.post(
  "/projects",
  async (req: Request, res: Response) => {
    try {
      const response = await pythonApi.post(
        "/projects/",
        req.body
      );

      return res.status(response.status).json(
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error creando proyecto:",
        error?.response?.data ?? error.message
      );

      return res.status(
        error?.response?.status ?? 500
      ).json({
        detail:
          error?.response?.data?.detail ??
          "Error al crear el proyecto.",
      });
    }
  }
);


// ----------------------------------------------------------------------
// 🟢 GET PROJECT
// GET /api/projects/:project_id
// ----------------------------------------------------------------------
router.get(
  "/projects/:project_id",
  async (req: Request, res: Response) => {
    try {
      const {
        project_id,
      } = req.params;

      const response = await pythonApi.get(
        `/projects/${project_id}`
      );

      return res.status(response.status).json(
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error obteniendo proyecto:",
        error?.response?.data ?? error.message
      );

      return res.status(
        error?.response?.status ?? 500
      ).json({
        detail:
          error?.response?.data?.detail ??
          "Error al obtener el proyecto.",
      });
    }
  }
);


// ----------------------------------------------------------------------
// 🟡 UPDATE PROJECT
// PUT /api/projects/:project_id
// ----------------------------------------------------------------------
router.put(
  "/projects/:project_id",
  async (req: Request, res: Response) => {
    try {
      const {
        project_id,
      } = req.params;

      const response = await pythonApi.put(
        `/projects/${project_id}`,
        req.body
      );

      return res.status(response.status).json(
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error actualizando proyecto:",
        error?.response?.data ?? error.message
      );

      return res.status(
        error?.response?.status ?? 500
      ).json({
        detail:
          error?.response?.data?.detail ??
          "Error al actualizar el proyecto.",
      });
    }
  }
);


// ----------------------------------------------------------------------
// 🔴 DELETE PROJECT
// DELETE /api/projects/:project_id
// ----------------------------------------------------------------------
router.delete(
  "/projects/:project_id",
  async (req: Request, res: Response) => {
    try {
      const {
        project_id,
      } = req.params;

      const response = await pythonApi.delete(
        `/projects/${project_id}`
      );

      return res.status(response.status).json(
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error eliminando proyecto:",
        error?.response?.data ?? error.message
      );

      return res.status(
        error?.response?.status ?? 500
      ).json({
        detail:
          error?.response?.data?.detail ??
          "Error al eliminar el proyecto.",
      });
    }
  }
);


export default router;