"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
  Grid, // Using Grid2 for the 'size' prop convention
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

// Components
import { BasicInfoSection } from './components/BasicInfoSection';
import { ROMSpecificSection } from './components/ROMSpecificSection';
import { MediaUploadSection } from './components/MediaUploadSection';
import { PricingSection } from './components/PricingSection';
import { AuthModal } from './components/AuthModal';
import { validateImages } from './actions';
import { CollectiblesSection } from './components/CollectiblesSection';

export default function SellPage() {
  const { user, loading: authLoading } = useAuth();

  // UI State
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [selectedGame, setSelectedGame] = useState('Ragnarok M: Eternal Love');
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  // File States (Initialized as empty arrays to avoid .length errors)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // General Media
  const [relicFiles, setRelicFiles] = useState<File[]>([]);       // Collectibles: Relics
  const [cardFiles, setCardFiles] = useState<File[]>([]);        // Collectibles: Cards
  const [mountFiles, setMountFiles] = useState<File[]>([]);      // Collectibles: Mounts

  // Handlers for General Media
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
      prev.includes(name) ? prev.filter(h => h !== name) : [...prev, name]
    );
  };

  const handlePostListing = async () => {
    if (authLoading) return;
    setError(null);

    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Combine all files
      const allFiles = [
        ...selectedFiles,
        ...relicFiles,
        ...cardFiles,
        ...mountFiles
      ];

      if (allFiles.length === 0) {
        setError("Please upload at least one image.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      allFiles.forEach((file) => formData.append('images', file));

      // 2. Validate - CAPTURE THE RETURNED OBJECT
      const result = await validateImages(formData);

      // 3. Handle specific validation error returned from server
      if (result.error) {
        setError(result.error);
        alert(`Upload Rejected: ${result.error}`);
        setIsSubmitting(false);
        return; // Stop execution
      }

      // 4. Proceed with Database logic if success
      // await supabase.from('listings').insert({...})

      alert("Success! Your listing is safe and posted.");
    } catch (err: any) {
      // This now only catches actual network/system crashes
      setError("A system error occurred. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: 6, maxWidth: 'lg', mx: 'auto', px: 2 }}>
      {/* Error Feedback */}
      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2, fontWeight: 'bold' }}>
          {error}
        </Typography>
      )}

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

              {/* 1. Basic Info */}
              <BasicInfoSection
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
              />

              <Divider />

              {/* 2. Ragnarok M Specifics & Collectibles */}
              {selectedGame === 'Ragnarok M: Eternal Love' && (
                <>
                  <ROMSpecificSection
                    selectedHeroes={selectedHeroes}
                    toggleHeroClass={toggleHeroClass}
                  />
                  <Divider />

                  <CollectiblesSection
                    relics={relicFiles}
                    setRelics={setRelicFiles}
                    cards={cardFiles}
                    setCards={setCardFiles}
                    mounts={mountFiles}
                    setMounts={setMountFiles}
                  />
                  <Divider />
                </>
              )}

              {/* 3. Media: Screenshots Upload */}
              <MediaUploadSection
                selectedFiles={selectedFiles}
                onFileChange={handleFileChange}
                onRemove={removeFile}
              />

              <Divider />

              {/* 4. Pricing */}
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

      <AuthModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />
    </Box>
  );
}