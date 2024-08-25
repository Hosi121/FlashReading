import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlashDisplay } from './FlashDisplay';
import { useLocation } from 'react-router-dom'; // useLocation をインポート

export const FlashDisplayDemo: React.FC = () => {
    const location = useLocation(); // location を使用して渡された state を受け取る
    const sentence = location.state?.sentence || ""; // 渡された sentence 全体を使用
    const [isComplete, setIsComplete] = useState(false);

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
                <FlashDisplay sentences={[sentence]} onComplete={handleComplete} />
            ) : (
                <Typography variant="h5">
                    全ての文章が表示されました！
                </Typography>
            )}
        </Box>
    );
}

export default FlashDisplayDemo;
