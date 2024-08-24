import React, { useState, useEffect } from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';
import { ChunkDisplay } from './ChunkDisplay';
import { ProgressIndicator } from './ProgressIndicator';

interface FlashDisplayProps {
    sentences: string[];
    onComplete: () => void;
}

export const FlashDisplay: React.FC<FlashDisplayProps> = ({ sentences, onComplete }) => {
    const [chunks, setChunks] = useState<string[]>([]);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);

    useEffect(() => {
        if (currentSentenceIndex < sentences.length) {
            const words = sentences[currentSentenceIndex].split(' ');
            const newChunks: string[] = [];
            let currentChunks: string[] = [];

            for (const word of words) {
                const nextChunk = [...currentChunks, word].join(' ');
                const isWithinWordLimit = currentChunks.length < 5;
                const isWithinCharacterLimit = nextChunk.length >= 19 && nextChunk.length <= 28;

                if (isWithinWordLimit && isWithinCharacterLimit) {
                    currentChunks.push(word);
                } else {
                    if (currentChunks.length > 0) {
                        newChunks.push(currentChunks.join(' '));
                    }
                    currentChunks = [word];
                }
            }

            if (currentChunks.length > 0) {
                newChunks.push(currentChunks.join(' '));
            }

            setChunks(newChunks);
            setCurrentChunkIndex(0);
        } else {
            onComplete();
        }
    }, [currentSentenceIndex, sentences, onComplete]);

    useEffect(() => {
        if (currentChunkIndex < chunks.length) {
            const timer = setTimeout(() => {
                setCurrentChunkIndex(prevIndex => prevIndex + 1);
            }, speed); // speedを使用

            return () => clearTimeout(timer);
        } else if (currentSentenceIndex < sentences.length - 1) {
            setCurrentSentenceIndex(prevIndex => prevIndex + 1);
        } else {
            onComplete();
        }
    }, [currentChunkIndex, chunks, currentSentenceIndex, sentences, onComplete, speed]);

    const handleSpeedChange = (event: Event, newValue: number | number[]) => {
        setSpeed(newValue as number);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChunkDisplay chunk={chunks[currentChunkIndex] || ''} />
            <ProgressIndicator current={currentSentenceIndex + 1} total={sentences.length} />
            <Box sx={{ width: '80%', mt: 2, mb: 2 }}>
                <Typography gutterBottom>速度調整（ミリ秒）</Typography>
                <Slider
                    value={speed}
                    onChange={handleSpeedChange}
                    aria-labelledby="speed-slider"
                    step={100}
                    marks
                    min={100}
                    max={2000}
                    valueLabelDisplay="auto"
                />
            </Box>
            <Button variant="contained" color="primary" onClick={onComplete}>
                完了
            </Button>
        </Box>
    );
}