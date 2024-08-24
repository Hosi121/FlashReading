import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ChunkDisplayProps {
    chunk: string;
}

export const ChunkDisplay: React.FC<ChunkDisplayProps> = ({ chunk }) => (
    <Paper elevation={3} sx={{ width: '80%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" align="center">
            {chunk}
        </Typography>
    </Paper>
);