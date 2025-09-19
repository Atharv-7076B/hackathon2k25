import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ScienceIcon from "@mui/icons-material/Science";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CampaignIcon from "@mui/icons-material/Campaign";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PlaceIcon from "@mui/icons-material/Place";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const location = useLocation();
  const navLinks = [
  { label: t.dashboard, icon: <DashboardIcon />, route: "/" },
  { label: t.inputUpload, icon: <CloudUploadIcon />, route: "/input-upload" },
  { label: t.dataPrediction, icon: <ShowChartIcon />, route: "/data-prediction" },
  { label: t.mlAnalysis, icon: <ScienceIcon />, route: "/ml-analysis" },
  { label: t.simulation, icon: <SettingsIcon />, route: "/simulation" },
  { label: t.trainAudit, icon: <FindInPageIcon />, route: "/train-audit" }
];


  const dataModules = [
    { label: t.fitness, icon: <CheckCircleIcon /> },
    { label: t.jobCard, icon: <BuildCircleIcon /> },
    { label: t.branding, icon: <CampaignIcon /> },
    { label: t.mileage, icon: <DirectionsCarIcon /> },
    { label: t.cleaning, icon: <CleaningServicesIcon /> },
    { label: t.stabling, icon: <PlaceIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: isDark
            ? 'linear-gradient(180deg, #0f1a1d 0%, #0b1416 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f7fffe 100%)',
          color: isDark ? '#eceff1' : 'inherit',
          borderRight: `1px solid ${isDark ? '#ffffff22' : 'rgba(0,0,0,0.12)'}`
        },
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ my: 1, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: '#30D5C8', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
        <DashboardIcon color="primary" sx={{ mr: 1 }} />
        <div>
          <Typography fontWeight={700} variant="body1" lineHeight={1}>
            Railway Ops
          </Typography>
          <Typography fontSize={12} color={isDark ? '#b0bec5' : 'text.secondary'}>
            Management System
          </Typography>
        </div>
      </Toolbar>
      <Divider />
      <List>
        <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, pb: 0, color: isDark ? '#b0bec5' : 'text.secondary' }}>
          {t.mainNav}
        </Typography>
        {navLinks.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <ListItem
              button
              key={item.label}
              component={RouterLink}
              to={item.route}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                pl: 1.25,
                pr: 1,
                transition: 'background-color .15s ease, box-shadow .2s ease',
                backgroundColor: isActive ? (isDark ? '#112126' : '#E6FFFB') : 'transparent',
                boxShadow: isActive ? (isDark ? 'inset 0 0 0 1px #30D5C899' : 'inset 0 0 0 1px #30D5C8') : 'none',
                '&:hover': {
                  backgroundColor: isDark ? '#0f2025' : '#F3FFFE',
                  boxShadow: 'inset 0 0 0 1px #30D5C84d'
                }
              }}
            >
              <ListItemIcon sx={{ color: isActive ? '#30D5C8' : theme.palette.text.secondary, minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  color: 'text.primary'
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, pb: 0, color: isDark ? '#b0bec5' : 'text.secondary' }}>
          {t.dataModules}
        </Typography>
        {dataModules.map((item) => (
          <ListItem
            button
            key={item.label}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              pl: 1.25,
              pr: 1,
              transition: 'background-color .15s ease, box-shadow .2s ease',
              '&:hover': {
                backgroundColor: isDark ? '#0f2025' : '#F3FFFE',
                boxShadow: 'inset 0 0 0 1px #30D5C84d'
              }
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.secondary, minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ color: 'text.primary' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
