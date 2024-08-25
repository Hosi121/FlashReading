import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  Button,
  Container
} from '@mui/material';
import VocabInput from './vocabInput';
import { sendChatMessage } from '../../services/chatService';
import { ChatRequest, ChatResponse } from '../../types/chat';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate を使用

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
    setIsLoading(true);
    const wordList = words.map(w => w.text).join(',');
    
    try {
      const chatRequest: ChatRequest = {
        message: wordList,
      };
  
      const response: ChatResponse = await sendChatMessage(chatRequest);
      console.log('バックエンドからの応答:', response);
  
      // `Sentence:` 以降の全文を抽出
      const fullResponse = response.choices[0].message.content;
      const sentenceStartIndex = fullResponse.indexOf("Sentence: ");
      const sentence = sentenceStartIndex !== -1 
        ? fullResponse.substring(sentenceStartIndex + "Sentence: ".length).trim() 
        : fullResponse;
  
      // ここで /demo ページに遷移し、sentence 全体を渡す
      navigate('/demo', { state: { sentence } }); 
  
    } catch (error) {
      console.error('エラーが発生しました:', error);
      // TODO: エラーハンドリング（例：エラーメッセージ表示）
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            sx={{ px: 4, py: 1, fontSize: '1.1rem' }}
          >
            {isLoading ? '送信中...' : '決定'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VocabInputPage;