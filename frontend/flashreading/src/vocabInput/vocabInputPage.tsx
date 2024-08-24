import { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography, 
  Chip, 
  Paper, 
  Button,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const vocabInputPage = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [words, setWords] = useState(['React', 'TypeScript', 'Material-UI']);

  const handleWordInputChange = (e) => {
    setCurrentWord(e.target.value);
  };

  const handleAddWord = () => {
    if (currentWord.trim() !== '') {
      setWords([...words, currentWord.trim()]);
      setCurrentWord('');
    }
  };

  const handleDeleteWord = (wordToDelete) => {
    setWords(words.filter((word) => word !== wordToDelete));
  };

  const handleSubmit = () => {
    console.log('決定ボタンが押されました。登録された単語:', words);
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
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              value={currentWord}
              onChange={handleWordInputChange}
              variant="outlined"
              placeholder="単語を入力してください"
              fullWidth
              size="small"
              sx={{ mr: 1 }}
            />
            <IconButton
              onClick={handleAddWord}
              color="primary"
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {words.map((word, index) => (
              <Chip
                key={index}
                label={word}
                onDelete={() => handleDeleteWord(word)}
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

export default vocabInputPage;