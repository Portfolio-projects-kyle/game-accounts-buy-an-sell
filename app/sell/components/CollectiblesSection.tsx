"use client";
import React, { ChangeEvent } from 'react';
import { Box, Typography, Grid, Button, IconButton, Stack } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import StyleIcon from '@mui/icons-material/Style';
import PetsIcon from '@mui/icons-material/Pets';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

interface UploadBoxProps {
    title: string;
    icon: any;
    color: string;
    files: File[];
    onFilesAdded: (newFiles: File[]) => void;
    onFileRemoved: (index: number) => void;
}

const ImageUploadBox = ({ title, icon: Icon, color, files, onFilesAdded, onFileRemoved }: UploadBoxProps) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesAdded(Array.from(e.target.files));
        }
    };

    return (
        <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon fontSize="small" sx={{ color }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{title}</Typography>
            </Box>

            <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 2, textAlign: 'center', bgcolor: 'action.hover', minHeight: '140px' }}>
                <Button component="label" variant="text" startIcon={<CloudUploadIcon />} sx={{ color, mb: files.length > 0 ? 2 : 0, fontWeight: 'bold' }}>
                    Upload Photos
                    <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                </Button>

                <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    {files.map((file, index) => (
                        <Grid key={index} sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src={URL.createObjectURL(file)}
                                sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover', border: `1px solid ${color}` }}
                            />
                            <IconButton
                                size="small"
                                onClick={() => onFileRemoved(index)}
                                sx={{ position: 'absolute', top: -6, right: -6, bgcolor: 'background.paper', boxShadow: 2, '&:hover': { bgcolor: 'error.main', color: 'white' } }}
                            >
                                <CloseIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
};

interface CollectiblesProps {
    relics: File[];
    cards: File[];
    mounts: File[];
    setRelics: (files: File[]) => void;
    setCards: (files: File[]) => void;
    setMounts: (files: File[]) => void;
}

export const CollectiblesSection = ({ relics, cards, mounts, setRelics, setCards, setMounts }: CollectiblesProps) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Valuable Collectibles
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ImageUploadBox
                        title="Ancient Relics" icon={DiamondIcon} color="#1976d2"
                        files={relics}
                        onFilesAdded={(newFiles) => setRelics([...relics, ...newFiles])}
                        onFileRemoved={(idx) => setRelics(relics.filter((_, i) => i !== idx))}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ImageUploadBox
                        title="Rare Cards (MVP/Star)" icon={StyleIcon} color="#9c27b0"
                        files={cards}
                        onFilesAdded={(newFiles) => setCards([...cards, ...newFiles])}
                        onFileRemoved={(idx) => setCards(cards.filter((_, i) => i !== idx))}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ImageUploadBox
                        title="Premium Mounts" icon={PetsIcon} color="#ffb800"
                        files={mounts}
                        onFilesAdded={(newFiles) => setMounts([...mounts, ...newFiles])}
                        onFileRemoved={(idx) => setMounts(mounts.filter((_, i) => i !== idx))}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};