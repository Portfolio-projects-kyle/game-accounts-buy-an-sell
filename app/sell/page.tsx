"use client";
import React from 'react';
import {
  Box, Typography, Paper, TextField, MenuItem, 
  Button, InputAdornment, Divider, Stack, Switch, 
  FormControlLabel, Stepper, Step, StepLabel, Grid
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SellIcon from '@mui/material/Tooltip';

const GAMES = ['Valorant', 'League of Legends', 'CS2', 'Apex Legends', 'Fortnite'];

export default function SellPage() {
  const steps = ['Account Details', 'Media', 'Pricing'];

  return (
    <Box sx={{ py: 6 }}>
      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: '-1px', mb: 1 }}>
          List Your <Box component="span" sx={{ color: 'primary.main' }}>Account</Box>
        </Typography>
        <Typography color="text.secondary">
          Reach thousands of buyers in minutes. Secure and fast.
        </Typography>
      </Box>

      {/* Modern Stepper */}
      <Stepper activeStep={0} alternativeLabel sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4} justifyContent="center">
        {/* Main Form Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Stack spacing={4}>
              
              {/* Section 1: Basic Info */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountCircleIcon color="primary" /> Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField select fullWidth label="Game Name" defaultValue="Valorant">
                      {GAMES.map((game) => (
                        <MenuItem key={game} value={game}>{game}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Account Rank" placeholder="e.g. Radiant / Global Elite" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Listing Title" placeholder="e.g. Stacked OG Account with Rare Skins" />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Section 2: Media Upload */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhotoLibraryIcon color="primary" /> Screenshots & Proof
                </Typography>
                <Box sx={{ 
                  border: '2px dashed', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 3, 
                  p: 4, 
                  textAlign: 'center',
                  bgcolor: 'rgba(255,255,255,0.02)',
                  transition: '0.2s',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(157, 78, 221, 0.05)' }
                }}>
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6">Drag and drop images here</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Upload up to 10 high-quality screenshots (PNG, JPG)
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" size="small">Browse Files</Button>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* Section 3: Pricing */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Set Your Price</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField 
                      fullWidth 
                      label="Price" 
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack direction="row" spacing={2}>
                      <FormControlLabel 
                        control={<Switch defaultChecked color="secondary" />} 
                        label="Instant Delivery" 
                      />
                      <FormControlLabel 
                        control={<Switch color="secondary" />} 
                        label="Negotiable" 
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                sx={{ py: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                Post Listing
              </Button>

            </Stack>
          </Paper>
        </Grid>

        {/* Right Side: Tips Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(157, 78, 221, 0.05)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Selling Tips</Typography>
            <Typography variant="body2" sx={{ mb: 2, display: 'block' }}>
              • <strong>Be Honest:</strong> Mention if the account has any bans or recovery issues.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, display: 'block' }}>
              • <strong>Show Skins:</strong> Listings with 5+ screenshots sell 70% faster.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, display: 'block' }}>
              • <strong>Fast Response:</strong> Active sellers are boosted in the marketplace search results.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}