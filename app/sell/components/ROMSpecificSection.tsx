"use client";
import React from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Stack, InputAdornment, Chip } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StarsIcon from '@mui/icons-material/Stars';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Added for the helper icon
import { HERO_CLASSES } from '../constants/gameData';

interface Props {
  selectedHeroes: string[];
  toggleHeroClass: (name: string) => void;
}

export const ROMSpecificSection = ({ selectedHeroes, toggleHeroClass }: Props) => (
  <Stack spacing={4}>
    {/* --- Section: Stats, Server & Binds --- */}
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <QueryStatsIcon color="secondary" /> Stats, Server & Binds
      </Typography>
      
      <Grid container spacing={2}>
        {/* Handbook Stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth label="Handbook ATK" type="number" placeholder="2500" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth label="Handbook MATK" type="number" placeholder="2000" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth label="Handbook HP" type="number" placeholder="50000" />
        </Grid>

        {/* Deposit Percentage */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField 
            fullWidth 
            label="ATK/MATK Deposit" 
            placeholder="15"
            InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} 
          />
        </Grid>

        {/* Server Selection */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select fullWidth label="Region / Server" defaultValue="SEA">
            <MenuItem value="SEA">SEA</MenuItem>
            <MenuItem value="Global">Global</MenuItem>
            <MenuItem value="EU">EU</MenuItem>
          </TextField>
        </Grid>

        {/* Account Bind Type */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select fullWidth label="Bind Type" defaultValue="Dummy Gmail">
            <MenuItem value="Dummy Gmail">Dummy Gmail (Full Access)</MenuItem>
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Apple ID">Apple ID</MenuItem>
            <MenuItem value="Taptap">Taptap</MenuItem>
          </TextField>
        </Grid>

        {/* --- Bind Issues Field --- */}
        <Grid size={{ xs: 12 }}>
          <TextField 
            fullWidth 
            multiline 
            rows={2} 
            label="Bind Issues / Details" 
            placeholder="e.g. Facebook is disabled, or secondary email is not accessible..."
            helperText="Leave empty if there are no bind issues."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WarningAmberIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>

    {/* --- Section: Hero Classes --- */}
    <Box sx={{ 
      p: 3, 
      borderRadius: 3, 
      bgcolor: 'rgba(255, 184, 0, 0.05)', 
      border: '1px solid rgba(255, 184, 0, 0.2)' 
    }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#ffb800' }}>
        <StarsIcon /> Hero Classes (7/7 Runes)
      </Typography>

      {/* Selected Heroes Chips Display */}
      <Box sx={{ 
        minHeight: 56, 
        p: 1.5, 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: 1, 
        bgcolor: 'rgba(0,0,0,0.2)', 
        mb: 2, 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1 
      }}>
        {selectedHeroes.length === 0 && (
          <Typography variant="body2" color="text.secondary">No classes selected...</Typography>
        )}
        {selectedHeroes.map((hero) => (
          <Chip 
            key={hero} 
            label={hero} 
            onDelete={() => toggleHeroClass(hero)} 
            sx={{ fontWeight: 'bold', bgcolor: '#ffb800', color: '#000' }} 
          />
        ))}
      </Box>

      {/* Hero Class Selection Pool */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {HERO_CLASSES.map((hero) => {
          const isSelected = selectedHeroes.includes(hero.name);
          return (
            <Chip
              key={hero.name}
              label={hero.name}
              onClick={() => toggleHeroClass(hero.name)}
              variant={isSelected ? "filled" : "outlined"}
              size="small"
              sx={{ 
                cursor: 'pointer', 
                borderColor: hero.collab ? '#ffb800' : 'rgba(255,255,255,0.3)',
                color: isSelected ? '#000' : (hero.collab ? '#ffb800' : 'inherit'),
                bgcolor: isSelected ? (hero.collab ? '#ffb800' : '#fff') : 'transparent',
                '&:hover': {
                  bgcolor: isSelected ? (hero.collab ? '#ffb800' : '#fff') : 'rgba(255, 184, 0, 0.1)',
                  borderColor: '#ffb800'
                }
              }}
              icon={hero.collab && !isSelected ? <StarsIcon style={{ fontSize: 14, color: '#ffb800' }} /> : undefined}
            />
          );
        })}
      </Stack>
    </Box>
  </Stack>
);