import axios from "axios";

// ============================================================
// CONFIGURACIÓN API
// ============================================================

const API_URL = "http://localhost:3000/api";

// ============================================================
// TIPOS
// ============================================================

export interface Activity {
  id: string;
  project_id: string;
  name: string;

  bac: number | null;
  planned_progress: number | null;
  actual_progress: number | null;
  actual_cost: number | null;
}

export interface CreateActivityRequest {
  project_id: string;
  name: string;
  bac: number;
  planned_progress: number;
  actual_progress: number;
  actual_cost: number;
}

export interface UpdateActivityRequest {
  name?: string;
  bac?: number;
  planned_progress?: number;
  actual_progress?: number;
  actual_cost?: number;
}

// ============================================================
// OBTENER TODAS LAS ACTIVIDADES
// GET /api/activities
// ============================================================

export const getActivities = async (): Promise<Activity[]> => {
  const response = await axios.get<Activity[]>(`${API_URL}/activities`);

  return Array.isArray(response.data) ? response.data : [];
};

// ============================================================
// OBTENER ACTIVIDADES DE UN PROYECTO
// GET /api/activities/project/:project_id
// ============================================================

export const getProjectActivities = async (
  projectId: string,
): Promise<Activity[]> => {
  if (!projectId) {
    return [];
  }

  const response = await axios.get<Activity[]>(
    `${API_URL}/activities/project/${projectId}`,
  );

  /*
   * El backend normalmente devuelve directamente:
   *
   * [
   *   {
   *     id: "...",
   *     project_id: "...",
   *     name: "...",
   *     ...
   *   }
   * ]
   *
   * Por eso devolvemos response.data.
   */

  return Array.isArray(response.data) ? response.data : [];
};

// ============================================================
// OBTENER UNA ACTIVIDAD
// GET /api/activities/:activity_id
// ============================================================

export const getActivity = async (activityId: string): Promise<Activity> => {
  const response = await axios.get<Activity>(
    `${API_URL}/activities/${activityId}`,
  );

  return response.data;
};

// ============================================================
// CREAR ACTIVIDAD
// POST /api/activities
// ============================================================

export const createActivity = async (
  data: CreateActivityRequest,
): Promise<Activity> => {
  const response = await axios.post<Activity>(`${API_URL}/activities`, data);

  return response.data;
};

// ============================================================
// ACTUALIZAR ACTIVIDAD
// PATCH /api/activities/:activity_id
// ============================================================

export const updateActivity = async (
  activityId: string,
  data: UpdateActivityRequest,
): Promise<Activity> => {
  const response = await axios.patch<Activity>(
    `${API_URL}/activities/${activityId}`,
    data,
  );

  return response.data;
};

// ============================================================
// ELIMINAR ACTIVIDAD
// DELETE /api/activities/:activity_id
// ============================================================

export const deleteActivity = async (activityId: string): Promise<void> => {
  await axios.delete(`${API_URL}/activities/${activityId}`);
};