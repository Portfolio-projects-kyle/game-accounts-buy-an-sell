"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./components/NavBar";

// Specialized Gaming Theme
const gamingTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9d4edd", // Electric Purple
    },
    secondary: {
      main: "#00f5d4", // Cyber Mint
    },
    background: {
      default: "#0a0a0c", // Deep Black-Navy
      paper: "#16161a",   // Slightly lighter card background
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export default function MUIWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={gamingTheme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        {/* Removed mt: 4 to give us more control over hero sections if needed */}
        <Box sx={{ mb: 4 }}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}