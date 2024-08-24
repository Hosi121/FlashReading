import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./auth/Register";
import Login from "./auth/Login";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setLoading(false);
    setShowSplash(false);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (showSplash) {
    return <div>Loading...</div>; // 必要に応じてSplashScreenコンポーネントを使ってください
  }

  if (loading) {
    return <div>Loading...</div>; // 必要に応じてLoadingScreenコンポーネントを使ってください
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;