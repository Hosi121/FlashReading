import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface WordInputProps {
  currentWord: string;
  onWordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddWord: () => void;
}

const WordInput: React.FC<WordInputProps> = ({ currentWord, onWordInputChange, onAddWord }) => {
  return (
    <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="単語を入力"
        value={currentWord}
        onChange={onWordInputChange}
        size="small"
        sx={{ flexGrow: 1, mr: 1 }}
        placeholder="単語を入力してください"
      />
      <IconButton onClick={onAddWord} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default WordInput;