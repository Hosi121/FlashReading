import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./UserAnswer.css";

interface UserAnswerProps {
  correctWords: string[]; // 正解の単語群
  allWords: string[];     // 選択肢として使う単語群
  sentence: string;       // 表示する文章
  onComplete: (results: boolean[]) => void; // 完了時に結果を渡す
}

const UserAnswer: React.FC<UserAnswerProps> = ({ correctWords, allWords, sentence, onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const highlightText = (text: string, word: string) => {
    const regex = new RegExp(`(${word})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      word.toLowerCase() === part.toLowerCase() ? (
        <span key={index} style={{ color: "red" }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleWordSelection = (selectedWord: string) => {
    const isCorrect = selectedWord.toLowerCase() === correctWords[currentWordIndex].toLowerCase();
    setResults([...results, isCorrect]);

    if (currentWordIndex + 1 >= correctWords.length) {
      onComplete(results);
    } else {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (currentWordIndex >= correctWords.length) {
    return null;
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      bgcolor="grey.100" 
      p={4}
    >
      {/* 問題文を表示するボックス */}
      <Box 
        bgcolor="white" 
        p={4} 
        mb={4} 
        borderRadius={2} 
        boxShadow={3} 
        width="100%" 
        maxWidth="600px" 
        textAlign="center"
      >
        <Typography variant="h5">
          {highlightText(sentence, correctWords[currentWordIndex])}
        </Typography>
      </Box>

      {/* 回答ボタンを表示するグリッド */}
      <Grid container spacing={2} justifyContent="center" width="100%" maxWidth="600px">
        {allWords.map((word, index) => (
          <Grid item xs={6} key={index}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleWordSelection(word)}
              sx={{ 
                height: '60px',  // 縦の高さを小さく設定
                borderRadius: 2,
                fontSize: '1rem' // フォントサイズも少し小さめに
              }}
            >
              {word}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserAnswer;
