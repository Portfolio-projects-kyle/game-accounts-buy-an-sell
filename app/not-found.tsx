"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon, SentimentVeryDissatisfied } from '@mui/icons-material';

export default function NotFound() {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Large Visual Icon */}
        <SentimentVeryDissatisfied 
          sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} 
        />

        <Typography variant="h1" fontWeight="bold" color="primary" gutterBottom>
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          Oops! Page Not Found.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          The account you're looking for might have been sold, deleted, or 
          the URL might be mistyped. Let's get you back on track.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{ px: 4 }}
          >
            Back to Home
          </Button>
          
          <Button
            component={Link}
            href="/marketplace"
            variant="outlined"
            size="large"
          >
            Browse Marketplace
          </Button>
        </Box>
      </Box>
    </Container>
  );
}