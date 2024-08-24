import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import WordInput from './vocabInput';

const WordInputPage: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value);
  };

  const handleAddWord = () => {
    if (currentWord.trim() !== '') {
      setWords([...words, currentWord]);
      setCurrentWord(''); // 入力フィールドをクリア
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0', // 背景色を追加（必要に応じて）
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
        }}
      >
        <Typography variant="h4" gutterBottom>
          覚えたい単語を入力しよう！
        </Typography>
        <WordInput
          currentWord={currentWord}
          onWordInputChange={handleWordInputChange}
          onAddWord={handleAddWord}
        />
        <List sx={{ width: '100%', mt: 2 }}>
          {words.map((word, index) => (
            <ListItem key={index}>
              <ListItemText primary={word} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default WordInputPage;
