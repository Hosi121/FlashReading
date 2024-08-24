import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
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
            }, 1000);

            return () => clearTimeout(timer);
        } else if (currentSentenceIndex < sentences.length - 1) {
            setCurrentSentenceIndex(prevIndex => prevIndex + 1);
        } else {
            onComplete();
        }
    }, [currentChunkIndex, chunks, currentSentenceIndex, sentences, onComplete]);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChunkDisplay chunk={chunks[currentChunkIndex] || ''} />
            <ProgressIndicator current={currentSentenceIndex + 1} total={sentences.length} />
            <Button variant="contained" color="primary" onClick={onComplete}>
                完了
            </Button>
        </Box>
    );
}