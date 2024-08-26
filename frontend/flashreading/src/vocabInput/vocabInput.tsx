import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface VocabInputProps {
  currentWord: string;
  onWordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddWord: () => void;
}

const VocabInput: React.FC<VocabInputProps> = ({ currentWord, onWordInputChange, onAddWord }) => {
  return (
    <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="単語を入力"
        value={currentWord}
        onChange={onWordInputChange}
        variant="outlined"
        fullWidth
        sx={{ mr: 1 }}
        placeholder="単語を入力してください"
      />
      <IconButton 
        onClick={onAddWord} 
        color="primary" 
        sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default VocabInput;