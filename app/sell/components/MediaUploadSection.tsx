import React, { useRef } from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    selectedFiles: File[];
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
}

export const MediaUploadSection = ({ selectedFiles, onFileChange, onRemove }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhotoLibraryIcon color="primary" /> Media & Showcase (Optional Highlights)
            </Typography>
            <input type="file" multiple accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileChange} />
            <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{ border: '2px dashed', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 3, p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
            >
                <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6">{selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Upload Screenshots'}</Typography>
            </Box>
            <Grid container spacing={1} sx={{ mt: 2 }}>
                {selectedFiles.map((file, index) => (
                    <Grid size={{ xs: 4, md: 2, sm: 3 }} key={index}>
                        <Box sx={{ position: 'relative', pt: '100%', borderRadius: 2, overflow: 'hidden' }}>
                            <Box component="img" src={URL.createObjectURL(file)} sx={{ position: 'absolute', top: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                            <IconButton onClick={() => onRemove(index)} size="small" sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,0.6)', color: 'white' }}><DeleteIcon /></IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};