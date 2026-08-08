import type { ReactElement } from "react";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Topbar = (): ReactElement => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Gestión de Proyectos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Earned Value Management
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            C
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;