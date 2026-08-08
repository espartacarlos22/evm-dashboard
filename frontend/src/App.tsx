import type { ReactElement } from "react";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { LoaderProvider } from "@/context/LoaderContext";

import NavigationLoader from "@/components/common/NavigationLoader";
import Sidebar from "@/layouts/main-layout/Sidebar/Sidebar";
import Topbar from "@/layouts/main-layout/Topbar/Topbar";

const AppLayout = (): ReactElement => {
  return (
    <LoaderProvider>
      <NavigationLoader />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#f5f7fa",
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Topbar />

          <Box
            component="main"
            sx={{
              flex: 1,
              width: "100%",
              minWidth: 0,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </LoaderProvider>
  );
};

const App = (): ReactElement => {
  return <AppLayout />;
};

export default App;