"use client";
import React from 'react';
import {
    Box, Typography, Grid, TextField,
    InputAdornment, Stack, FormControlLabel, Switch
} from '@mui/material';

export const PricingSection = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Set Your Price
            </Typography>
            <Grid container spacing={2} alignItems="center">
                {/* Price Input */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        placeholder="5000"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                                        ₱
                                    </Typography>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Options Toggles */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                    >
                        <FormControlLabel
                            control={<Switch defaultChecked color="secondary" />}
                            label="Kafra Premium Member"
                        />
                        <FormControlLabel
                            control={<Switch color="secondary" />}
                            label="Negotiable"
                        />
                    </Stack>
                </Grid>
            </Grid>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Note: A small platform fee may apply upon successful sale.
            </Typography>
        </Box>
    );
};