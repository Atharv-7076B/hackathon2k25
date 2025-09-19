import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrainIcon from "@mui/icons-material/Train";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const icons = {
  train: <TrainIcon color="success" />,
  build: <BuildCircleIcon color="warning" />,
  timer: <TimerIcon color="warning" />,
  check_circle: <CheckCircleIcon color="success" />,
};

export default function StatCard({ label, value, sublabel, icon }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Card
      elevation={0}
      sx={{
        minHeight: 140,
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: isDark ? '0 16px 32px rgba(0,0,0,0.65)' : '0 14px 28px rgba(48,213,200,0.33)',
          borderColor: isDark ? '#30D5C844' : '#30D5C8'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ color: 'text.secondary' }} variant="subtitle1">
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={800} sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
        {sublabel && (
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            {sublabel}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ pr: 2, fontSize: 38 }}>
        {icons[icon]}
      </Box>
    </Card>
  );
}
