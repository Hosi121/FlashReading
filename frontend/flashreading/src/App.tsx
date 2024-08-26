import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./auth/Register";
import Login from "./auth/Login";
import VocabInputPage from "./vocabInput/vocabInputPage";
import FlashPlayDemo from "./FlashDisplay/FlashDisplayDemo";
import UserAnswer from "./UserAnswer/UserAnswer";

const App: React.FC = () => {
  const [results, setResults] = useState<boolean[]>([]);
  
  const handleComplete = (userResults: boolean[]) => {
    setResults(userResults);
    navigate('/results'); // 結果ページに遷移 (ここでnavigateを使用するか、別の結果ページを作る)
  };

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wordinput" element={<VocabInputPage />} />
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
    </Provider>
  );
};

export default App;