import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./auth/Register";
import Login from "./auth/Login";
import WordInputPage from "./vocabInput/vocabInputPage";
import FlashPlayDemo from "./FlashDisplay/FlashDisplayDemo";
import UserAnswer from "./UserAnswer/UserAnswer";

const App: React.FC = () => {
  const [results, setResults] = useState<boolean[]>([]);
  
  const handleComplete = (userResults: boolean[]) => {
    setResults(userResults);
    navigate('/results'); // 結果ページに遷移 (ここでnavigateを使用するか、別の結果ページを作る)
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wordinput" element={<WordInputPage />} />
          <Route path="/demo" element={<FlashPlayDemo />} />
          <Route 
            path="/answer" 
            element={
              <UserAnswer 
                correctWords={["banana", "apple", "grape"]} 
                allWords={["banana", "apple", "grape", "orange"]} 
                sentence="This is a banana."
                onComplete={handleComplete}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;