"use client";
import React from 'react';
import {
  Dialog, DialogContent, Typography, Box, 
  Stack, Button, IconButton, Zoom
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockPersonIcon from '@mui/icons-material/LockPerson';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: '#1a1a1a', // Matching your dark theme
          backgroundImage: 'none',
          maxWidth: 400
        }
      }}
    >
      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        {/* Close Button */}
        <IconButton 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>

        {/* Icon Header */}
        <Box sx={{ 
          mb: 3, 
          display: 'inline-flex', 
          p: 2, 
          borderRadius: '50%', 
          bgcolor: 'rgba(157, 78, 221, 0.1)' 
        }}>
          <LockPersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>

        {/* Text Content */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Sign in Required
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          You need to be logged in to post a listing. 
          This helps us keep the marketplace safe for everyone.
        </Typography>

        {/* Actions */}
        <Stack spacing={2}>
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            sx={{ fontWeight: 'bold', py: 1.5 }} 
            href='/login'
          >
            Login / Sign Up
          </Button>
          <Button 
            variant="text" 
            fullWidth 
            onClick={onClose} 
            sx={{ color: 'text.secondary' }}
          >
            Maybe Later
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};