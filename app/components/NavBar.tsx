"use client";

import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemText, CircularProgress,
  Skeleton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/app/context/AuthContext"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth(); 
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    // AuthContext handles the redirect and router.refresh()
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Marketplace", path: "/marketplace" },
    { title: "Sell", path: "/sell" },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0b0f19", borderBottom: "1px solid #1f2937" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* MOBILE MENU ICON */}
        <IconButton 
          color="inherit" 
          onClick={() => setOpen(true)} 
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* LOGO */}
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          component={Link} 
          href="/" 
          sx={{ 
            flexGrow: { xs: 1, md: 0 }, 
            textAlign: { xs: 'center', md: 'left' },
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          GameMarket
        </Typography>

        {/* DESKTOP NAV LINKS */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navLinks.map((link) => (
            <Button 
              key={link.title} 
              color="inherit" 
              component={Link} 
              href={link.path}
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              {link.title}
            </Button>
          ))}
        </Box>

        {/* AUTH LOGIC - Prevents UI Jumps */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", minWidth: { md: 180 }, justifyContent: 'flex-end' }}>
          {loading ? (
            /* Using a Skeleton instead of a Spinner prevents the "jump" when the button appears */
            <Skeleton variant="rectangular" width={100} height={36} sx={{ bgcolor: '#1f2937', borderRadius: 1 }} />
          ) : user ? (
            <>
              <Button 
                component={Link} 
                href="/dashboard" 
                sx={{ color: "secondary.main", fontWeight: 'bold', textTransform: 'none' }}
              >
                Dashboard
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                onClick={handleLogout}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                href="/login" 
                sx={{ color: "#c7d2fe", display: { xs: 'none', sm: 'block' }, textTransform: 'none' }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                component={Link} 
                href="/signup" 
                sx={{ 
                  bgcolor: "#6366f1", 
                  textTransform: 'none',
                  "&:hover": { bgcolor: "#4f46e5" } 
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, bgcolor: "#0b0f19", height: "100%", color: "white" }}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', borderBottom: '1px solid #1f2937' }}>
            Menu
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component={Link} href={link.path} onClick={() => setOpen(false)}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
            
            <Box sx={{ my: 1, borderTop: "1px solid #1f2937" }} />

            {loading ? (
               <ListItem sx={{ justifyContent: 'center' }}><CircularProgress size={24} /></ListItem>
            ) : user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/dashboard" onClick={() => setOpen(false)}>
                    <ListItemText primary="Dashboard" sx={{ color: 'secondary.main' }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { handleLogout(); setOpen(false); }}>
                    <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/login" onClick={() => setOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}