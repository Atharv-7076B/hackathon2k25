import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";

const languages = [
  { code: "en", label: "English" },
  { code: "ml", label: "Malayalam" },
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
];

export default function Topbar({ mode, setMode, lang, setLang, t, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLangChange = (code) => {
    setLang(code);
    handleMenuClose();
  };

  return (
    <AppBar
      elevation={0}
      color="inherit"
      position="static"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          fontWeight={600}
          color="text.primary"
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <BoltOutlinedIcon color="primary" />
          Railway Operations Management
        </Typography>
        <Typography mr={2} color="text.secondary">
          Welcome back, Operations Manager
        </Typography>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          color="inherit"
        >
          {mode === "light" ? (
            <DarkModeOutlinedIcon sx={{ color: "#37474F" }} />
          ) : (
            <LightModeOutlinedIcon sx={{ color: "#FFEB3B" }} />
          )}
        </IconButton>
        <Button
          color="inherit"
          startIcon={<LanguageIcon />}
          onClick={handleMenuOpen}
          sx={{ textTransform: "none", ml: 1 }}
        >
          {languages.find((item) => item.code === lang)?.label}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {languages.map((item) => (
            <MenuItem
              key={item.code}
              selected={item.code === lang}
              onClick={() => handleLangChange(item.code)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={onLogout}               // <-- THIS IS THE ONLY CHANGE
          sx={{ ml: 1, textTransform: "none" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
