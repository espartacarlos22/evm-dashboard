import { Card, CardContent, Grid, Typography } from "@mui/material";

// ============================================================
// PROPS
// ============================================================

export interface EVMCardsProps {
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
}

// ============================================================
// HELPERS
// ============================================================

const safeNumber = (value: number | null | undefined): number => {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
};

const formatMoney = (value: number | null | undefined): string => {
  return `$${safeNumber(value).toLocaleString("es-CO")}`;
};

const formatIndex = (value: number | null | undefined): string => {
  return safeNumber(value).toFixed(2);
};

// ============================================================
// COMPONENTE
// ============================================================

const EVMCards = ({
  bac,
  pv,
  ev,
  ac,
  cv,
  sv,
  cpi,
  spi,
  eac,
  vac,
}: EVMCardsProps) => {
  const data = [
    {
      title: "BAC",
      value: formatMoney(bac),
      negative: false,
    },

    {
      title: "PV",
      value: formatMoney(pv),
      negative: false,
    },

    {
      title: "EV",
      value: formatMoney(ev),
      negative: false,
    },

    {
      title: "AC",
      value: formatMoney(ac),
      negative: false,
    },

    {
      title: "CV",
      value: formatMoney(cv),
      negative: safeNumber(cv) < 0,
    },

    {
      title: "SV",
      value: formatMoney(sv),
      negative: safeNumber(sv) < 0,
    },

    {
      title: "CPI",
      value: formatIndex(cpi),
      negative: safeNumber(cpi) < 1,
    },

    {
      title: "SPI",
      value: formatIndex(spi),
      negative: safeNumber(spi) < 1,
    },

    {
      title: "EAC",
      value: formatMoney(eac),
      negative: false,
    },

    {
      title: "VAC",
      value: formatMoney(vac),
      negative: safeNumber(vac) < 0,
    },
  ];

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid
          key={item.title}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2,
          }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
              >
                {item.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  mt: 1,
                  color: item.negative ? "error.main" : "text.primary",
                }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EVMCards;
