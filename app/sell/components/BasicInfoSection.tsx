import React from 'react';
import { Box, Typography, Grid, TextField, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GAMES } from '../constants/gameData';

interface Props {
    selectedGame: string;
    setSelectedGame: (game: string) => void;
}

export const BasicInfoSection = ({ selectedGame, setSelectedGame }: Props) => (
    <Box>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircleIcon color="primary" /> Basic Information
        </Typography>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    select fullWidth label="Game Name"
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                >
                    {GAMES.map((game) => (
                        <MenuItem key={game} value={game}>{game}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Listing Title" placeholder="e.g. +15 Gear Saint Account" />
            </Grid>
        </Grid>
    </Box>
);