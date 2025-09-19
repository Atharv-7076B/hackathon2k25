import React from "react";
import {
  Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress, Paper
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ScienceIcon from "@mui/icons-material/Science";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTheme } from "@mui/material/styles";

const metricCards = [
  { label: "Active Models", value: 12, icon: <ScienceIcon color="primary" fontSize="large" /> },
  { label: "Predictions", value: 24, icon: <ShowChartIcon color="warning" fontSize="large" /> },
  { label: "Accuracy Rate", value: "87%", icon: <TrendingUpIcon color="success" fontSize="large" /> },
  { label: "Cost Savings", value: "$24.5K", icon: <BoltIcon color="primary" fontSize="large" /> }
];

const failurePredictions = [
  {
    title: "Brake System Failure", train: "TR-4521", timeframe: "7-10 days", probability: 78, risk: "High", subtitle: "Schedule immediate inspection"
  },
  {
    title: "Engine Performance Drop", train: "TR-4522", timeframe: "14-21 days", probability: 65, risk: "Medium", subtitle: "Monitor closely and plan maintenance"
  },
  {
    title: "Door Mechanism Issue", train: "TR-4523", timeframe: "30-45 days", probability: 45, risk: "Low", subtitle: "Include in next scheduled maintenance"
  }
];

const riskColor = {
  High: "error",
  Medium: "warning",
  Low: "success"
};

const trendData = [
  { label: "Overall System Health", value: 92, change: "+2.3%", status: "Improving", color: "primary" },
  { label: "Predictive Accuracy", value: 87, change: "+1.8%", status: "Stable", color: "primary" },
  { label: "Maintenance Efficiency", value: 74, change: "-0.5%", status: "Declining", color: "primary" }
];

const changeChipColor = (change) =>
  change.startsWith("+") ? "primary" : change.startsWith("-") ? "error" : "default";

const maintenanceSuggestions = [
  {
    train: "TR-4521", component: "Brake Pads", action: "Replace within 5 days", priority: "High", savings: 2400
  },
  {
    train: "TR-4522", component: "Oil Filter", action: "Service within 2 weeks", priority: "Medium", savings: 800
  },
  {
    train: "TR-4523", component: "Door Seals", action: "Inspect and lubricate", priority: "Low", savings: 350
  }
];

const priorityColor = {
  High: "error",
  Medium: "warning",
  Low: "success"
};

export default function MLAnalysis() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      px: { xs: 2, md: 3 },
      py: { xs: 2, md: 3 },
      minHeight: "100vh",
      background: isDark
        ? `linear-gradient(180deg, #0b1416 0%, #0b1416 100%)`
        : `linear-gradient(180deg, #30D5C811 0%, #ffffff 35%)`
    }}>
      <Typography variant="h4" fontWeight={800} mb={0.5}>
        ML Analysis Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Machine learning insights and predictive analytics
      </Typography>
      <Box sx={{ height: 6, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 3 }} />

      {/* Metric Cards */}
      <Grid container spacing={3} mb={2}>
        {metricCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card elevation={0} sx={{
              border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
              boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
              bgcolor: isDark ? '#0f1a1d' : '#ffffff',
              borderRadius: 2,
              transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: isDark ? '0 16px 32px rgba(0,0,0,0.65)' : '0 14px 28px rgba(48,213,200,0.33)',
                borderColor: isDark ? '#30D5C844' : '#30D5C8'
              }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                {card.icon}
                <Box ml={2}>
                  <Typography color="text.secondary" variant="subtitle2">
                    {card.label}
                  </Typography>
                  <Typography fontWeight={800} variant="h5">
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Grid: Left = Failure Predictions, Right = Trend Analysis */}
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{
            p: 3, mb: 3,
            border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
            bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
          }}>
            <Typography variant="h6" mb={2} display="flex" alignItems="center">
              <WarningAmberIcon sx={{ mr: 1 }} color="warning" /> Failure Predictions
            </Typography>
            <Typography variant="body2" mb={2}>
              ML-driven predictions for potential equipment failures
            </Typography>
            {failurePredictions.map((p) => (
              <Box key={p.title} mb={3} sx={{
                border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
                bgcolor: isDark ? '#0c181b' : '#FAFEFD',
                borderRadius: 2, p: 2,
                boxShadow: isDark ? '0 6px 16px rgba(0,0,0,0.45)' : '0 6px 16px rgba(48,213,200,0.12)'
              }}>
                <Box display="flex" alignItems="center" mb={0.3}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {p.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={p.risk}
                    color={riskColor[p.risk]}
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.7}>
                  Train: <strong>{p.train}</strong> &nbsp; Timeframe: <strong>{p.timeframe}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1.2}>
                  Probability
                </Typography>
                <Box display="flex" alignItems="center" mb={0.3}>
                  <LinearProgress variant="determinate" value={p.probability} sx={{ flex: 1, height: 8, borderRadius: 4 }} />
                  <Typography fontWeight={600} fontSize={16} sx={{ ml: 2 }}>
                    {p.probability}%
                  </Typography>
                </Box>
                <Typography variant="body2" fontStyle="italic" color="text.secondary">
                  {p.subtitle}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{
            p: 3, mb: 3,
            border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
            bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
          }}>
            <Typography variant="h6" mb={2} display="flex" alignItems="center">
              <ShowChartIcon sx={{ mr: 1 }} color="primary" /> Trend Analysis
            </Typography>
            <Typography variant="body2" mb={2}>
              Performance trends and system health metrics
            </Typography>
            {trendData.map((t) => (
              <Box key={t.label} mb={2}>
                <Typography fontWeight={600} mb={0.3}>
                  {t.label}
                  <Chip
                    size="small"
                    label={t.change}
                    color={changeChipColor(t.change)}
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Box display="flex" alignItems="center">
                  <LinearProgress
                    variant="determinate"
                    value={t.value}
                    color={t.color}
                    sx={{ flex: 1, height: 8, borderRadius: 4, mr: 2 }}
                  />
                  <Typography fontWeight={700} fontSize={18}>{t.value}%</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Status: {t.status}
                </Typography>
              </Box>
            ))}
            <Button sx={{ mt: 3 }} variant="outlined" color="inherit" startIcon={<ScienceIcon />}>
              Configure Analysis Parameters
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Preventive Maintenance Suggestions */}
      <Paper elevation={0} sx={{
        p: 3,
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
      }}>
        <Typography variant="h6" fontWeight={700} mb={1.3} display="flex" alignItems="center">
          <Chip
            size="small"
            label="Preventive"
            color="success"
            sx={{ mr: 1 }}
          />
          Preventive Maintenance Suggestions
        </Typography>
        <Typography variant="body2" mb={2}>
          AI-recommended maintenance actions to prevent failures
        </Typography>
        <Box sx={{
          overflowX: 'auto',
          border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
          borderRadius: 2,
          backgroundColor: isDark ? '#0f1a1d' : '#ffffff'
        }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                <th align="left">Train</th>
                <th align="left">Component</th>
                <th align="left">Recommended Action</th>
                <th align="left">Priority</th>
                <th align="left">Est. Savings</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceSuggestions.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.train}</td>
                  <td>{row.component}</td>
                  <td>{row.action}</td>
                  <td>
                    <Chip size="small" label={row.priority} color={priorityColor[row.priority] || "default"} />
                  </td>
                  <td>
                    <Typography color={row.savings >= 2000 ? "success.main" : "warning.main"} fontWeight={600}>
                      ${row.savings.toLocaleString()}
                    </Typography>
                  </td>
                  <td>
                    <Button size="small" variant="outlined" startIcon={<AccessTimeIcon />}>
                      Schedule
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
}
