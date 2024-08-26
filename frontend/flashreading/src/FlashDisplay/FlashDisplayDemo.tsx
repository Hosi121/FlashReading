import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { FlashDisplay } from './FlashDisplay';
import { RootState } from '../store';

export const FlashDisplayDemo: React.FC = () => {
    const [isComplete, setIsComplete] = useState(false);
    const chatResponse = useSelector((state: RootState) => state.chat.response);

    const sentence = chatResponse?.choices[0]?.message.content || "";

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
                chatResponse ? (
                    <FlashDisplay sentences={[sentence]} onComplete={handleComplete} />
                ) : (
                    <Typography variant="h6">
                        データを読み込み中...
                    </Typography>
                )
            ) : (
                <Typography variant="h5">
                    全ての文章が表示されました！
                </Typography>
            )}
        </Box>
    );
}

export default FlashDisplayDemo;