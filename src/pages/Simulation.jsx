import React, { useState } from "react";
import {
  Box, Grid, Typography, Paper, Button, CircularProgress, TextField, Chip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const quickTemplates = [
  {
    title: "Peak Hour Disruption",
    desc: "3 trains unavailable during morning rush"
  },
  {
    title: "Maintenance Window",
    desc: "Track closure for 4 hours overnight"
  },
  {
    title: "Emergency Scenario",
    desc: "Signal failure affecting 2 routes"
  }
];

const impactRows = [
  {
    metric: "Service Frequency",
    baseline: "Every 3 minutes",
    simulated: "Every 5 minutes",
    impact: "Reduced by 40%",
    status: "critical"
  },
  {
    metric: "Passenger Capacity",
    baseline: "12,000/hour",
    simulated: "8,400/hour",
    impact: "Reduced by 30%",
    status: "warning"
  },
  {
    metric: "Average Delay",
    baseline: "2.1 minutes",
    simulated: "7.3 minutes",
    impact: "Increased by 247%",
    status: "critical"
  },
  {
    metric: "Resource Utilization",
    baseline: "85%",
    simulated: "92%",
    impact: "Increased by 8%",
    status: "normal"
  }
];

const solutionRows = [
  {
    title: "Deploy backup trains from depot B",
    details: "Restore 60% of lost capacity",
    implementation: "15 minutes",
    cost: "$1,200"
  },
  {
    title: "Reroute trains via alternate track",
    details: "Reduce delays by 40%",
    implementation: "5 minutes",
    cost: "$300"
  },
  {
    title: "Activate emergency bus service",
    details: "Handle 2,000 passengers/hour",
    implementation: "30 minutes",
    cost: "$2,500"
  }
];

const statusColorMap = {
  critical: "error",
  warning: "warning",
  normal: "success"
};

export default function Simulation() {
  const [description, setDescription] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleRun = () => {
    setIsRunning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 900); // Simulate quick "running" for UI effect
  };

  const handleUseTemplate = idx => {
    setActiveTemplate(idx);
    setDescription(quickTemplates[idx].desc);
    setShowResults(false);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
    setActiveTemplate(null);
    setShowResults(false);
  };

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
        What-If Simulation
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Test scenarios and analyze operational impact
      </Typography>
      <Box sx={{ height: 6, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 3 }} />
      <Grid container spacing={3}>
        {/* Left: Scenario Input & Templates */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{
            p: 3, mb: 2,
            border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
            bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
          }}>
            <Typography variant="h6" mb={1.2}>Scenario Input</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Describe the situation you want to simulate
            </Typography>
            <TextField
              variant="outlined"
              label="Scenario Description"
              fullWidth
              rows={3}
              multiline
              placeholder="e.g., 3 trains unavailable during peak hours due to maintenance..."
              value={description}
              onChange={handleDescriptionChange}
            />
            <Box display="flex" alignItems="center" mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                startIcon={isRunning ? <AutorenewIcon sx={{ animation: "spin 1s linear infinite" }} /> : null}
                onClick={handleRun}
                disabled={!description || isRunning}
              >
                {isRunning ? "Running..." : "Run Simulation"}
              </Button>
              <Button sx={{ ml: 1 }} color="inherit" onClick={() => { setDescription(""); setActiveTemplate(null); setShowResults(false); }}><AutorenewIcon /></Button>
            </Box>
          </Paper>
          <Paper elevation={0} sx={{
            p: 3,
            border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
            bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
          }}>
            <Typography variant="h6" mb={1.2}>Quick Templates</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Common scenarios to get started</Typography>
            {quickTemplates.map((tpl, idx) => (
              <Paper
                key={tpl.title}
                elevation={0}
                sx={{
                  mb: 1.3, p: 2, cursor: "pointer",
                  border: `1px solid ${activeTemplate === idx ? (isDark ? '#30D5C844' : '#30D5C8') : (isDark ? '#ffffff22' : '#607D8B33')}`,
                  bgcolor: activeTemplate === idx ? (isDark ? '#0c181b' : '#FAFEFD') : (isDark ? '#0f1a1d' : '#ffffff'),
                  borderRadius: 2,
                  transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark ? '0 12px 24px rgba(0,0,0,0.6)' : '0 12px 24px rgba(48,213,200,0.2)',
                    borderColor: isDark ? '#30D5C844' : '#30D5C8'
                  }
                }}
                onClick={() => handleUseTemplate(idx)}
              >
                <Typography fontWeight={600}>{tpl.title}</Typography>
                <Typography color="text.secondary" variant="body2">{tpl.desc}</Typography>
              </Paper>
            ))}
          </Paper>
        </Grid>
        {/* Right: Results */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{
            p: 4, minHeight: 320,
            border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
            bgcolor: isDark ? '#0f1a1d' : '#ffffff', borderRadius: 2
          }}>
            {!description && (
              <Box textAlign="center" mt={4}>
                <SettingsIcon color="disabled" sx={{ fontSize: 56 }} />
                <Typography variant="h6" fontWeight={600} mt={2}>
                  Ready to Simulate
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Enter a scenario description and click "Run Simulation" to see the analysis
                </Typography>
                <Chip label="Fleet Management" sx={{ mr: 1 }} />
                <Chip label="Maintenance Impact" sx={{ mr: 1 }} />
                <Chip label="Route Analysis" />
              </Box>
            )}
            {description && !showResults && (
              <Box mt={4} textAlign="center">
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="subtitle2">Simulation in progress...</Typography>
              </Box>
            )}
            {showResults && (
              <Box>
                {/* Impact Analysis Table */}
                <Typography variant="h6" mb={2} color="warning.main" display="flex" alignItems="center">
                  <WarningAmberIcon fontSize="inherit" sx={{ mr: 1 }} color="warning" /> Impact Analysis
                </Typography>
                <Typography variant="body2" mb={2}>Comparative analysis of operational metrics</Typography>
                <Box sx={{
                  overflowX: 'auto',
                  border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
                  borderRadius: 2,
                  backgroundColor: isDark ? '#0f1a1d' : '#ffffff'
                }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
                    <thead>
                      <tr>
                        <th align="left">Metric</th>
                        <th align="left">Baseline</th>
                        <th align="left">Simulated</th>
                        <th align="left">Impact</th>
                        <th align="left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {impactRows.map((r, idx) => (
                        <tr key={idx}>
                          <td>{r.metric}</td>
                          <td>{r.baseline}</td>
                          <td>{r.simulated}</td>
                          <td>{r.impact}</td>
                          <td>
                            <Chip size="small" label={r.status} color={statusColorMap[r.status] || "default"} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
                {/* Recommended Solutions */}
                <Typography variant="h6" mb={2} mt={4} color="success.main" display="flex" alignItems="center">
                  <CheckCircleIcon fontSize="inherit" sx={{ mr: 1 }} color="success" /> Recommended Solutions
                </Typography>
                <Typography variant="body2" mb={2}>AI-generated mitigation strategies</Typography>
                <Box sx={{ mb: 2 }}>
                  {solutionRows.map((row, idx) => (
                    <Paper key={idx} sx={{
                      mb: 2, p: 2,
                      border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
                      bgcolor: isDark ? '#0c181b' : '#FAFEFD',
                      borderRadius: 2,
                      boxShadow: isDark ? '0 6px 16px rgba(0,0,0,0.45)' : '0 6px 16px rgba(48,213,200,0.12)'
                    }}>
                      <Typography fontWeight={600}>{row.title}</Typography>
                      <Typography fontSize={14} color="text.secondary" mb={1}>Impact: {row.details}</Typography>
                      <Typography fontSize={14} color="text.secondary" mb={1}>Implementation: {row.implementation} &nbsp; &nbsp; Cost: {row.cost}</Typography>
                      <Button size="small" variant="outlined" color="primary">
                        Implement Solution
                      </Button>
                    </Paper>
                  ))}
                </Box>
                <Paper sx={{ p: 2, textAlign: "center", bgcolor: "success.light" }}>
                  <Typography fontWeight={600}>Simulation Complete</Typography>
                  <Typography color="text.secondary">
                    Analysis and recommendations are ready
                  </Typography>
                </Paper>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
