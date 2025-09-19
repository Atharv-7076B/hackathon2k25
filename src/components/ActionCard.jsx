import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BuildIcon from "@mui/icons-material/Build";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PlaceIcon from "@mui/icons-material/Place";

const icons = {
  chart: <ShowChartIcon color="primary" fontSize="large" />,
  build: <BuildIcon color="primary" fontSize="large" />,
  audit: <FindInPageIcon color="primary" fontSize="large" />,
  stabling: <PlaceIcon color="primary" fontSize="large" />,
};

export default function ActionCard({ label, description, icon }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 100,
        borderRadius: 2,
        cursor: "pointer",
        borderColor: isDark ? '#ffffff22' : '#607D8B33',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        boxShadow: isDark ? '0 6px 16px rgba(0,0,0,0.45)' : '0 6px 16px rgba(48,213,200,0.12)',
        transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: isDark ? `0 14px 28px rgba(0,0,0,0.6)` : `0 14px 28px rgba(48,213,200,0.33)`,
          borderColor: isDark ? '#30D5C844' : '#30D5C8'
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icons[icon]}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'text.primary' }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
