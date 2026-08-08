import axios from "axios";

// ============================================================
// CONFIGURACIÓN API
// ============================================================

const API_URL = "http://localhost:3000/api";

// ============================================================
// TIPOS
// ============================================================

export interface Project {
  id: string;

  name: string;

  description?: string | null;

  status?: string | null;

  // ==========================================================
  // DATOS EVM
  // ==========================================================

  bac?: number | null;

  pv?: number | null;

  ev?: number | null;

  ac?: number | null;

  cv?: number | null;

  sv?: number | null;

  cpi?: number | null;

  spi?: number | null;

  eac?: number | null;

  vac?: number | null;

  // ==========================================================
  // FECHAS
  // ==========================================================

  created_at?: string | null;

  updated_at?: string | null;
}

// ============================================================
// CREAR PROYECTO
// ============================================================

export interface CreateProjectRequest {
  name: string;
  description: string;
}

// ============================================================
// ACTUALIZAR PROYECTO
// ============================================================

export interface UpdateProjectRequest {
  name: string;
  description: string;
}

// ============================================================
// EVM DEL PROYECTO
// ============================================================

export interface ProjectEVM {
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
// OBTENER TODOS LOS PROYECTOS
// ============================================================

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_URL}/projects/`);

  return response.data;
};

// ============================================================
// OBTENER UN PROYECTO
// ============================================================

export const getProject = async (projectId: string): Promise<Project> => {
  const response = await axios.get<Project>(`${API_URL}/projects/${projectId}`);

  return response.data;
};

// ============================================================
// OBTENER EVM DEL PROYECTO
// ============================================================

export const getProjectEVM = async (projectId: string): Promise<ProjectEVM> => {
  const response = await axios.get<ProjectEVM>(
    `${API_URL}/projects/${projectId}/evm`,
  );

  return response.data;
};

// ============================================================
// CREAR PROYECTO
// ============================================================

export const createProject = async (
  data: CreateProjectRequest,
): Promise<Project> => {
  const response = await axios.post<Project>(`${API_URL}/projects/`, data);

  return response.data;
};

// ============================================================
// ACTUALIZAR PROYECTO
// ============================================================

export const updateProject = async (
  projectId: string,
  data: UpdateProjectRequest,
): Promise<Project> => {
  const response = await axios.put<Project>(
    `${API_URL}/projects/${projectId}`,
    data,
  );

  return response.data;
};

// ============================================================
// ELIMINAR PROYECTO
// ============================================================

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete(`${API_URL}/projects/${projectId}`);
};