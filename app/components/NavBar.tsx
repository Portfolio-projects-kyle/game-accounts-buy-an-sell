"use client";
import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemText 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: { xs: 1, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
          GameMarket
        </Typography>

        {/* DESKTOP NAV LINKS */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navLinks.map((link) => (
            <Button key={link.title} color="inherit" href={link.path}>{link.title}</Button>
          ))}
        </Box>

        {/* AUTH BUTTONS */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button href="/login" sx={{ color: "#c7d2fe", display: { xs: 'none', sm: 'block' } }}>Login</Button>
          <Button variant="contained" href="/signup" sx={{ bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" } }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, bgcolor: "#0b0f19", height: "100%", color: "white" }}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>Menu</Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component="a" href={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}