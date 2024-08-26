import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  Button,
  Container
} from '@mui/material';
import VocabInput from './VocabInput';
import { fetchChatResponse } from '../store/chatSlice';
import { RootState } from '../store';
import { AppDispatch } from '../store';

interface Word {
  id: number;
  text: string;
}

const VocabInputPage: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [words, setWords] = useState<Word[]>([
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Orange' }
  ]);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.chat);

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value);
  };

  const handleAddWord = () => {
    if (currentWord.trim() !== '') {
      const newWord: Word = {
        id: Date.now(),
        text: currentWord.trim()
      };
      setWords([...words, newWord]);
      setCurrentWord('');
    }
  };

  const handleDeleteWord = (idToDelete: number) => {
    setWords(words.filter((word) => word.id !== idToDelete));
  };

  const handleSubmit = async () => {
    const wordList = words.map(w => w.text).join(',');
    
    try {
      await dispatch(fetchChatResponse({ message: wordList }));
      navigate('/demo');
    } catch (error) {
      console.error('エラーが発生しました:', error);
      // エラーハンドリング（例：エラーメッセージの表示）
    }
  };

  return (
    <Box 
      sx={{ 
        bgcolor: 'grey.100', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        py: 4 
      }}
    >
      <Container maxWidth="md" sx={{ width: '100%' }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%' }}>
          <Typography variant="h5" align="center" gutterBottom>
            覚えたい単語を入力しよう！
          </Typography>
          <VocabInput
            currentWord={currentWord}
            onWordInputChange={handleWordInputChange}
            onAddWord={handleAddWord}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {words.map((word) => (
              <Chip
                key={word.id}
                label={word.text}
                onDelete={() => handleDeleteWord(word.id)}
                color="primary"
                variant="outlined"
                sx={{ 
                  fontSize: '1rem', 
                  '&:hover': { bgcolor: 'primary.light', color: 'white' },
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </Box>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={loading}
            sx={{ px: 4, py: 1, fontSize: '1.1rem' }}
          >
            {loading ? '送信中...' : '決定'}
          </Button>
        </Box>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            エラーが発生しました: {error}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default VocabInputPage;