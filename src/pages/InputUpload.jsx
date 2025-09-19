import React, { useRef, useState } from "react";
import {
  Box, Typography, Grid, Paper, Button, Snackbar, Alert, Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ChatIcon from "@mui/icons-material/Chat";
import TableChartIcon from "@mui/icons-material/TableChart";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categories = [
  {
    title: "Logbook",
    desc: "PDF format maintenance logs",
    icon: <InsertDriveFileIcon color="primary" sx={{ fontSize: 36 }} />,
    accept: ".pdf"
  },
  {
    title: "whatsapp messages",
    desc: "Text files or exported chats",
    icon: <ChatIcon color="success" sx={{ fontSize: 36 }} />,
    accept: ".txt"
  },
  {
    title: "spreadsheet data",
    desc: "Excel or CSV files",
    icon: <TableChartIcon color="warning" sx={{ fontSize: 36 }} />,
    accept: ".xlsx,.xls,.csv"
  },
  {
    title: "iot sensor data",
    desc: "Sensor readings and telemetry",
    icon: <OfflineBoltIcon color="secondary" sx={{ fontSize: 36 }} />,
    accept: ""
  }
];

export default function InputUpload() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const fileInputs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", success: true });

  const handleSelectFile = (idx, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...selectedFiles];
      updated[idx] = file;
      setSelectedFiles(updated);
    }
  };

  const handleSendInput = () => {
    const newUploads = selectedFiles
      .map((file, idx) =>
        file ? { name: file.name, type: categories[idx].title } : null
      )
      .filter(x => x !== null);
    if (newUploads.length) {
      setUploadedFiles([...uploadedFiles, ...newUploads]);
      setSnackbar({ open: true, msg: "File(s) uploaded successfully", success: true });
      setSelectedFiles([null, null, null, null]);
      fileInputs.current.forEach(ref => { if (ref.current) ref.current.value = ""; });
    } else {
      setSnackbar({ open: true, msg: "Please select at least one file.", success: false });
    }
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
      {/* Back to Dashboard */}
      <Box mb={2}>
        <Button startIcon={<ArrowBackIcon />} href="/" sx={{ textTransform: 'none', fontWeight: 600 }}>
          Back to Dashboard
        </Button>
      </Box>
      <Typography variant="h4" fontWeight={800} mb={1}>Input Upload</Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Upload and process operational data
      </Typography>
      <Box sx={{ height: 6, borderRadius: 2, background: 'linear-gradient(90deg, #30D5C8, #BCE34A)', mb: 3 }} />
      <Grid container spacing={3}>
        {categories.map((cat, idx) => (
          <Grid item xs={12} md={6} key={cat.title}>
            <Paper sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`,
              bgcolor: isDark ? '#0f1a1d' : '#ffffff',
              boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 10px 24px rgba(48,213,200,0.14)',
              borderRadius: 2,
              transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: isDark ? '0 16px 32px rgba(0,0,0,0.65)' : '0 14px 28px rgba(48,213,200,0.33)',
                borderColor: isDark ? '#30D5C844' : '#30D5C8'
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                {cat.icon}
                <Box>
                  <Typography fontWeight={700} sx={{ color: 'text.primary' }}>{cat.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.desc}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1.5, borderColor: isDark ? '#ffffff22' : '#607D8B33' }} />
              <Box>
                <input
                  ref={fileInputs.current[idx]}
                  type="file"
                  accept={cat.accept}
                  style={{ display: "none" }}
                  onChange={e => handleSelectFile(idx, e)}
                />
                <Button
                  variant="outlined"
                  onClick={() => fileInputs.current[idx].current.click()}
                  sx={{
                    textTransform: 'none',
                    borderColor: isDark ? '#ffffff44' : '#607D8B66',
                    '&:hover': { borderColor: '#30D5C8' }
                  }}
                >
                  Choose File
                </Button>
                <Typography variant="caption" ml={2} color="text.secondary">
                  {selectedFiles[idx] ? selectedFiles[idx].name : "No file chosen"}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} mb={2} textAlign="center">
        <Button
          size="large"
          variant="contained"
          onClick={handleSendInput}
          sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#30D5C8', color: '#0B2B2E', '&:hover': { bgcolor: '#27BDB1' } }}
        >
          Send Input
        </Button>
      </Box>
      {/* Uploaded Files List */}
      <Box mt={2}>
        {uploadedFiles.length > 0 && (
          <Paper sx={{ p: 2, border: `1px solid ${isDark ? '#ffffff22' : '#607D8B33'}`, bgcolor: isDark ? '#0f1a1d' : '#ffffff' }}>
            <Typography fontWeight={600} mb={1}>
              Uploaded Files
            </Typography>
            {uploadedFiles.map((f, idx) => (
              <Box key={f.name + idx} mb={0.5}>
                <InsertDriveFileIcon sx={{ verticalAlign: "middle", mr: 1, fontSize: 18, color: "primary.main" }} />
                {f.name}
                <Typography variant="caption" color="text.secondary" ml={1}>
                  ({f.type})
                </Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3200}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.success ? "success" : "error"}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
