import { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import "./index.css";

import router from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);