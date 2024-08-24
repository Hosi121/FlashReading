import React from 'react';
import { Typography } from '@mui/material';

interface ProgressIndicatorProps {
    current: number;
    total: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => (
    <Typography variant="body2" align="center" sx={{ mb: 2 }}>
        文 {current} / {total}
    </Typography>
);