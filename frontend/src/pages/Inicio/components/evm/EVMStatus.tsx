import type { ReactElement } from "react";

import { Alert, Stack } from "@mui/material";

interface EVMStatusProps {
  cpi?: number;
  spi?: number;
}

const EVMStatus = ({ cpi = 0.86, spi = 0.9 }: EVMStatusProps): ReactElement => {
  const costStatus =
    cpi >= 1 ? "Proyecto bajo presupuesto" : "Proyecto sobre presupuesto";

  const scheduleStatus = spi >= 1 ? "Proyecto adelantado" : "Proyecto atrasado";

  return (
    <Stack spacing={1.5}>
      <Alert severity={cpi >= 1 ? "success" : "warning"}>{costStatus}</Alert>

      <Alert severity={spi >= 1 ? "success" : "error"}>{scheduleStatus}</Alert>
    </Stack>
  );
};

export default EVMStatus;