"use client";

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  Stack, 
  Grid, 
  CircularProgress 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

// Components
import { BasicInfoSection } from './components/BasicInfoSection';
import { ROMSpecificSection } from './components/ROMSpecificSection';
import { CollectiblesSection } from './components/CollectiblesSection'; // New
import { MediaUploadSection } from './components/MediaUploadSection';
import { PricingSection } from './components/PricingSection';
import { AuthModal } from './components/AuthModal';

export default function SellPage() {
  const { user, loading: authLoading } = useAuth();
  
  // UI State
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedGame, setSelectedGame] = useState('Ragnarok M: Eternal Love');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleHeroClass = (name: string) => {
    setSelectedHeroes(prev => 
      prev.includes(name) 
        ? prev.filter(h => h !== name) 
        : [...prev, name]
    );
  };

  const handlePostListing = async () => {
    if (authLoading) return;

    // 1. Check Authentication
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    // 2. Submit Logic
    setIsSubmitting(true);
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Success! Listing for ${selectedGame} created by ${user.email}`);
    } catch (error) {
      console.error("Listing failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: 6, maxWidth: 'lg', mx: 'auto', px: 2 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Create New Listing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details to sell your account securely
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
            <Stack spacing={4}>
              
              {/* 1. Basic Info: Game Selection & Title */}
              <BasicInfoSection 
                selectedGame={selectedGame} 
                setSelectedGame={setSelectedGame} 
              />
              
              <Divider />

              {/* 2. Conditional Section: Ragnarok M Specifics */}
              {selectedGame === 'Ragnarok M: Eternal Love' && (
                <>
                  <ROMSpecificSection 
                    selectedHeroes={selectedHeroes} 
                    toggleHeroClass={toggleHeroClass} 
                  />
                  <Divider />
                  
                  {/* 3. New Section: Relics, Cards, and Mounts */}
                  <CollectiblesSection />
                  <Divider />
                </>
              )}

              {/* 4. Media: Screenshots Upload */}
              <MediaUploadSection 
                selectedFiles={selectedFiles} 
                onFileChange={handleFileChange} 
                onRemove={removeFile} 
              />
              
              <Divider />

              {/* 5. Pricing: Amount & Toggles */}
              <PricingSection />

              {/* Submit Button */}
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                disabled={isSubmitting}
                onClick={handlePostListing}
                sx={{ 
                  py: 2, 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px 0 rgba(157, 78, 221, 0.39)'
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "Post Listing"
                )}
              </Button>

            </Stack>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Modals */}
      <AuthModal 
        open={openAuthModal} 
        onClose={() => setOpenAuthModal(false)} 
      />
    </Box>
  );
}