// src/pages/WordInputPage.tsx

import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        単語入力ページ
      </Typography>
      <WordInput
        currentWord={currentWord}
        onWordInputChange={handleWordInputChange}
        onAddWord={handleAddWord}
      />
      <List>
        {words.map((word, index) => (
          <ListItem key={index}>
            <ListItemText primary={word} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WordInputPage;