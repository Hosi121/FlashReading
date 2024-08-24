import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlashDisplay } from './FlashDisplay';

export const FlashDisplayDemo: React.FC = () => {
    const [isComplete, setIsComplete] = useState(false);
    const sentences = [
        "The quick brown fox jumps over the lazy dog in the lush green meadow on a sunny afternoon.",
        "As the sun sets behind the mountains, casting long shadows across the valley, a gentle breeze rustles through the leaves of ancient oak trees.",
        "In the bustling city streets, people hurry to and fro, their footsteps echoing off the towering skyscrapers that reach towards the cloudy sky."
    ];

    const handleComplete = () => {
        setIsComplete(true);
    };

    return (
        <Box sx={{ 
            bgcolor: 'grey.100', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            p: 4 
        }}>
            <Typography variant="h4" gutterBottom>
                フラッシュ表示デモ
            </Typography>
            {!isComplete ? (
                <FlashDisplay sentences={sentences} onComplete={handleComplete} />
            ) : (
                <Typography variant="h5">
                    全ての文章が表示されました！
                </Typography>
            )}
        </Box>
    );
}

export default FlashDisplayDemo;