import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import DataPrediction from "./pages/DataPrediction";
import MLAnalysis from "./pages/MLAnalysis";
import Simulation from "./pages/Simulation";
import TrainAudit from "./pages/TrainAudit";
import InputUpload from "./pages/InputUpload";
import Login from "./pages/Login";
import translations from "./locales";

function App() {
  const [mode, setMode] = useState("light");
  const [lang, setLang] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );
  const t = translations[lang];

  // Shared layout to keep Sidebar/Topbar on all pages
  const Shell = ({ children }) => (
    <Box sx={{ display: "flex" }}>
      <Sidebar t={t} />
      <Box sx={{ flex: 1 }}>
        <Topbar
          mode={mode}
          setMode={setMode}
          lang={lang}
          setLang={setLang}
          t={t}
          onLogout={() => setIsLoggedIn(false)}
        />
        {children}
      </Box>
    </Box>
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell><Dashboard t={t} /></Shell>} />
          <Route path="/input-upload" element={<Shell><InputUpload /></Shell>} />
          <Route path="/data-prediction" element={<Shell><DataPrediction /></Shell>} />
          <Route path="/ml-analysis" element={<Shell><MLAnalysis /></Shell>} />
          <Route path="/simulation" element={<Shell><Simulation /></Shell>} />
          <Route path="/train-audit" element={<Shell><TrainAudit /></Shell>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
