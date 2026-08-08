import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { lazy } from "react";

import type { RouteObject } from "react-router-dom";

const App = lazy(() => import("../App"));

const Dashboard = lazy(
  () => import("../pages/Inicio/Dashboard")
);

const ProjectList = lazy(
  () => import("../pages/Projects/ProjectList")
);

const ProjectDetail = lazy(
  () => import("../pages/Projects/ProjectDetail")
);

const ProjectForm = lazy(
  () => import("../pages/Projects/ProjectForm")
);

const BASENAME = "/evm-dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/inicio"
            replace
          />
        ),
      },

      {
        path: "inicio",
        element: <Dashboard />,
      },

      {
        path: "projects",
        element: <ProjectList />,
      },

      {
        path: "projects/new",
        element: <ProjectForm />,
      },

      {
        path: "projects/:id",
        element: <ProjectDetail />,
      },

      {
        path: "projects/:id/edit",
        element: <ProjectForm />,
      },

      {
        path: "*",
        element: (
          <Navigate
            to="/inicio"
            replace
          />
        ),
      },
    ],
  },
];

const router = createBrowserRouter(
  routes,
  {
    basename: BASENAME,
  }
);

export default router;