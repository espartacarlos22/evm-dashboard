import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 3000),
  pythonApiUrl: process.env.PYTHON_API_URL ?? "http://localhost:8000",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173"
};
