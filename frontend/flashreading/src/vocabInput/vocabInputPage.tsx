import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  Button,
  Container
} from '@mui/material';
import VocabInput from './VocabInput';

interface Word {
  id: number;
  text: string;
}

const VocabInputPage: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [words, setWords] = useState<Word[]>([
    { id: 1, text: 'React' },
    { id: 2, text: 'TypeScript' },
    { id: 3, text: 'Material-UI' }
  ]);

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

  const handleSubmit = () => {
    console.log('決定ボタンが押されました。登録された単語:', words.map(w => w.text));
    // ここで実際のページ遷移やデータ送信のロジックを実装します
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
            sx={{ px: 4, py: 1, fontSize: '1.1rem' }}
          >
            決定
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VocabInputPage;