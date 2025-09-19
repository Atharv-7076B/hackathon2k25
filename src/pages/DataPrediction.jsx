import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Grid, Paper, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ShieldIcon from "@mui/icons-material/Shield";

// Metric cards
const stats = [
  { label: "Active Predictions", value: 24, icon: <ShowChartIcon color="primary" fontSize="large" /> },
  { label: "Risk Alerts", value: 8, icon: <WarningAmberIcon color="warning" fontSize="large" /> },
  { label: "Data Sources", value: 6, icon: <ShieldIcon color="success" fontSize="large" /> },
];

const modules = [
  { label: "Fitness" },
  { label: "Job Cards" },
  { label: "Branding" },
  { label: "Mileage" },
  { label: "Cleaning" },
  { label: "Stabling" },
];

// --- Fitness Certificates Data & Component ---
const fitnessData = [
  { trainId: "TR-4521", status: "Valid", expiry: "2024-03-15", type: "Annual", risk: "Low" },
  { trainId: "TR-4522", status: "Expired", expiry: "2024-01-20", type: "Monthly", risk: "High" },
  { trainId: "TR-4523", status: "Valid", expiry: "2024-05-10", type: "Annual", risk: "Low" },
  { trainId: "TR-4524", status: "Due Soon", expiry: "2024-02-05", type: "Quarterly", risk: "Medium" },
];

const statusColor = {
  Valid: "success",
  Expired: "error",
  "Due Soon": "warning",
  Open: "error",
  Closed: "success",
  Active: "success",
  "In Progress": "warning",
  Completed: "default",
  Available: "success",
  Occupied: "default",
  
};

const riskColor = {
  Low: "success",
  Medium: "warning",
  High: "error"
};

function FitnessTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Fitness Certificates</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for fitness certificates</Typography>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '12px 14px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: isDark ? '#0c181b' : '#FAFEFD'
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Train ID</th>
              <th align="left">Status</th>
              <th align="left">Expiry Date</th>
              <th align="left">Certificate Type</th>
              <th align="left">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {fitnessData.map((row) => (
              <tr key={row.trainId}>
                <td>{row.trainId}</td>
                <td>
                  <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} />
                </td>
                <td>{row.expiry}</td>
                <td>{row.type}</td>
                <td>
                  <Chip size="small" label={row.risk} color={riskColor[row.risk] || "default"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Job Cards Data & Component ---
const jobCardsData = [
  { jobId: "JC-2024-001", train: "TR-4521", type: "Brake System", status: "Open", priority: "High", assigned: "Team A" },
  { jobId: "JC-2024-002", train: "TR-4522", type: "Engine Check", status: "Open", priority: "Medium", assigned: "Team B" },
  { jobId: "JC-2024-003", train: "TR-4523", type: "Cleaning", status: "Closed", priority: "Low", assigned: "Team C" },
  { jobId: "JC-2024-004", train: "TR-4524", type: "Electrical", status: "Open", priority: "High", assigned: "Team A" },
];

const priorityColor = {
  Low: "success",
  Medium: "warning",
  High: "error"
};

function JobCardsTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Job-Card Status</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for job-card status</Typography>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '12px 14px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: isDark ? '#0c181b' : '#FAFEFD'
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Job ID</th>
              <th align="left">Train</th>
              <th align="left">Work Type</th>
              <th align="left">Status</th>
              <th align="left">Priority</th>
              <th align="left">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {jobCardsData.map((row) => (
              <tr key={row.jobId}>
                <td>{row.jobId}</td>
                <td>{row.train}</td>
                <td>{row.type}</td>
                <td>
                  <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} />
                </td>
                <td>
                  <Chip size="small" label={row.priority} color={priorityColor[row.priority] || "default"} />
                </td>
                <td>{row.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Branding Data & Component ---
const brandingData = [
  { campaign: "Metro Express", train: "TR-4521", status: "Active", expiry: "2024-06-15", revenue: "$15,000" },
  { campaign: "City Transit", train: "TR-4522", status: "Expired", expiry: "2024-01-30", revenue: "$12,500" }
];

function BrandingTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Branding Priorities</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for branding priorities</Typography>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '12px 14px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: isDark ? '#0c181b' : '#FAFEFD'
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Campaign</th>
              <th align="left">Train</th>
              <th align="left">Status</th>
              <th align="left">Expiry</th>
              <th align="left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {brandingData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.campaign}</td>
                <td>{row.train}</td>
                <td>
                  <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} />
                </td>
                <td>{row.expiry}</td>
                <td>{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Mileage Data & Component ---
const mileageData = [
  { trainId: "TR-4521", mileage: "125,430", target: "130,000", variance: "+3.5%", efficiency: "High" },
  { trainId: "TR-4522", mileage: "98,750", target: "100,000", variance: "-1.3%", efficiency: "Normal" }
];

function MileageTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Mileage Balancing</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for mileage balancing</Typography>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '12px 14px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: isDark ? '#0c181b' : '#FAFEFD'
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Train ID</th>
              <th align="left">Current Mileage</th>
              <th align="left">Target</th>
              <th align="left">Variance</th>
              <th align="left">Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {mileageData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.trainId}</td>
                <td>{row.mileage}</td>
                <td>{row.target}</td>
                <td>{row.variance}</td>
                <td>{row.efficiency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Cleaning Data & Component ---
const cleaningData = [
  { trainId: "TR-4521", bay: "Bay 3", time: "2024-02-01 14:00", status: "Completed", type: "Deep Clean" },
  { trainId: "TR-4522", bay: "Bay 1", time: "2024-02-01 16:00", status: "In Progress", type: "Standard" }
];

function CleaningTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Cleaning & Detailing Slots</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for cleaning & detailing slots</Typography>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
        backgroundColor: isDark ? '#0f1a1d' : '#ffffff',
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '12px 14px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: isDark ? '#0c181b' : '#FAFEFD'
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Train ID</th>
              <th align="left">Bay/Slot</th>
              <th align="left">Scheduled Time</th>
              <th align="left">Status</th>
              <th align="left">Cleaning Type</th>
            </tr>
          </thead>
          <tbody>
            {cleaningData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.trainId}</td>
                <td>{row.bay}</td>
                <td>{row.time}</td>
                <td>
                  <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} />
                </td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Stabling Data & Component ---
const stablingData = [
  { trainId: "TR-4521", bay: "A-12", position: "Platform Side", occupied: "18:30", depart: "05:45", status: "Occupied" },
  { trainId: "TR-4522", bay: "B-7", position: "Maintenance", occupied: "20:15", depart: "06:30", status: "Available" }
];

function StablingTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <div>
      <Typography variant="h6" mb={1}>Stabling Geometry</Typography>
      <Typography variant="body2" mb={2}>Operational data and analytics for stabling geometry</Typography>
      <Box sx={{
        overflowX: "auto",
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          tableLayout: 'fixed'
        },
        '& th, & td': {
          padding: '10px 12px',
          borderBottom: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        },
        '& thead th': {
          backgroundColor: isDark ? '#0f1a1d' : '#E6FFFB',
          color: theme.palette.text.primary,
          fontWeight: 700
        },
        '& tbody tr:hover': {
          backgroundColor: isDark ? '#112126' : '#F3FFFE'
        }
      }}>
        <table>
          <thead>
            <tr>
              <th align="left">Train ID</th>
              <th align="left">Bay</th>
              <th align="left">Position</th>
              <th align="left">Occupied Since</th>
              <th align="left">Departure Time</th>
              <th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {stablingData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.trainId}</td>
                <td>{row.bay}</td>
                <td>{row.position}</td>
                <td>{row.occupied}</td>
                <td>{row.depart}</td>
                <td>
                  <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// --- Main Data Prediction Page ---
export default function DataPrediction() {
  const [tab, setTab] = useState(0);
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
        Data Prediction & Analytics
      </Typography>
      <Typography variant="body1" mb={2} color="text.secondary">
        Operational data analysis and predictive insights
      </Typography>
      <Box sx={{ height: 6, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 3 }} />
      <Grid container spacing={3} mb={3} alignItems="stretch">
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label} sx={{ display: 'flex' }}>
            <Paper sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              minHeight: 120,
              height: '100%',
              width: '100%',
              border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
              bgcolor: isDark ? '#0f1a1d' : '#ffffff',
              borderRadius: 2,
              boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
              transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: isDark ? '0 16px 32px rgba(0,0,0,0.65)' : '0 14px 28px rgba(48,213,200,0.33)',
                borderColor: isDark ? '#30D5C844' : '#30D5C8'
              }
            }}>
              <Box sx={{ mr: 2 }}>{s.icon}</Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">{s.label}</Typography>
                <Typography variant="h5" fontWeight={800}>{s.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {modules.map((mod) => (
          <Tab key={mod.label} label={mod.label} />
        ))}
      </Tabs>
      <Paper sx={{
        p: 3,
        border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
        bgcolor: isDark ? '#0f1a1d' : '#ffffff',
        borderRadius: 2,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)'
      }}>
        <Grid container spacing={3}>
          {tab === 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Fitness Certificates</Typography>
              <Box sx={{ height: 4, width: 140, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <FitnessTable />
            </Grid>
          )}
          {tab === 1 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Job-Card Status</Typography>
              <Box sx={{ height: 4, width: 140, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <JobCardsTable />
            </Grid>
          )}
          {tab === 2 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Branding Priorities</Typography>
              <Box sx={{ height: 4, width: 160, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <BrandingTable />
            </Grid>
          )}
          {tab === 3 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Mileage Balancing</Typography>
              <Box sx={{ height: 4, width: 150, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <MileageTable />
            </Grid>
          )}
          {tab === 4 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Cleaning & Detailing Slots</Typography>
              <Box sx={{ height: 4, width: 210, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <CleaningTable />
            </Grid>
          )}
          {tab === 5 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>Stabling Geometry</Typography>
              <Box sx={{ height: 4, width: 160, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 1.5 }} />
              <StablingTable />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
