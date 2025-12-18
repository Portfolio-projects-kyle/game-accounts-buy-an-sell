"use client";

import { Box, Typography, Button, Link } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      <Typography variant="h3" mb={2}>
        Welcome to My Next.js App
      </Typography>
      <Typography variant="body1" mb={4}>
        Get started by navigating to Login or Sign Up pages.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" href="/login">
          Login
        </Button>
        <Button variant="outlined" href="/signup">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
