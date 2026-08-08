import { useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

interface PageLoaderProps {
  text?: string;
}

const PageLoader = ({ text = "Cargando..." }: PageLoaderProps) => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const size = isXs ? 80 : isMd ? 120 : 150;

  useEffect(() => {
    const scrollY =
      window.scrollY || document.documentElement.scrollTop || 0;

    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      width: document.body.style.width,
      overscrollBehavior: document.body.style.overscrollBehavior,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.width = "100%";
    document.body.style.overscrollBehavior = "none";

    document.documentElement.style.overscrollBehavior = "none";

    const prevent = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);

      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.left = originalStyle.left;
      document.body.style.width = originalStyle.width;
      document.body.style.overscrollBehavior =
        originalStyle.overscrollBehavior || "";

      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        zIndex: 9999999,
        bgcolor: "rgba(20, 19, 19, 0.9)",
        touchAction: "none",
      }}
    >
      <CircularProgress
        size={size}
        thickness={5}
      />

      <Typography
        variant={isXs ? "body1" : "h6"}
        sx={{
          color: "#fff",
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default PageLoader;