import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  InputAdornment
} from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Brand palette from provided style guide
  const PRIMARY = "#30D5C8"; // Primary Identity Color
  const BORDERS_TEXT = "#607D8B"; // Text and borders
  const HEADINGS = "#37474F"; // Big headings
  const HIGHLIGHT = "#BCE34A"; // Highlight key features (approx.)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo logic - replace with Django API call later
    if (username === "admin" && password === "railway123") {
      if (onLogin) onLogin(username);
    } else {
      alert("Invalid credentials. (Demo: admin / railway123)");
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // Soothing background using brand primary
      background: `linear-gradient(135deg, ${PRIMARY}22, #ffffff 60%)`,
    }}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: 380,
          textAlign: "center",
          borderRadius: 3,
          bgcolor: "#ffffff",
          border: `1px solid ${BORDERS_TEXT}33`,
          boxShadow: `0 10px 30px ${PRIMARY}22`,
          position: "relative"
        }}
      >
        {/* Accent bar */}
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          background: `linear-gradient(90deg, ${PRIMARY}, ${HIGHLIGHT})`
        }} />

        <Avatar sx={{ bgcolor: PRIMARY, width: 56, height: 56, mx: "auto", mb: 2, color: "#053B3F" }}>
          <TrainIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" fontWeight={800} mb={0.5} sx={{ color: HEADINGS }}>
          Railway Operations
        </Typography>
        <Typography variant="body2" mb={3} sx={{ color: BORDERS_TEXT }}>
          Management System Access Portal
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: BORDERS_TEXT }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: `${BORDERS_TEXT}80` },
                '&:hover fieldset': { borderColor: HEADINGS },
                '&.Mui-focused fieldset': { borderColor: PRIMARY, boxShadow: `0 0 0 3px ${PRIMARY}22` }
              }
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: BORDERS_TEXT }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: `${BORDERS_TEXT}80` },
                '&:hover fieldset': { borderColor: HEADINGS },
                '&.Mui-focused fieldset': { borderColor: PRIMARY, boxShadow: `0 0 0 3px ${PRIMARY}22` }
              }
            }}
          />

          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              mb: 1.5,
              bgcolor: PRIMARY,
              color: "#0B2B2E",
              fontWeight: 700,
              textTransform: "none",
              '&:hover': { bgcolor: "#27BDB1" }
            }}
          >
            Sign In
          </Button>
          <Typography variant="caption" sx={{ color: BORDERS_TEXT }}>
            Demo credentials: admin / railway123
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
