import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ChunkDisplayProps {
    chunk: string;
}

export const ChunkDisplay: React.FC<ChunkDisplayProps> = ({ chunk }) => (
    <Paper elevation={3} sx={{ width: '85%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h1" align="center">
            {chunk}
        </Typography>
    </Paper>
);