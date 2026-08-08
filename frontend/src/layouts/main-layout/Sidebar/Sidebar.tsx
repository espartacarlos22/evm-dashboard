import type { ReactElement } from "react";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  DashboardOutlined,
  FolderOutlined,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/inicio",
      icon: <DashboardOutlined />,
    },
    {
      label: "Proyectos",
      path: "/projects",
      icon: <FolderOutlined />,
    },
  ];

  return (
    <Box
      component="aside"
      sx={{
        width: 250,
        minWidth: 250,
        minHeight: "100vh",
        bgcolor: "#ffffff",
        borderRight: "1px solid",
        borderColor: "divider",
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          EVM Dashboard
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;