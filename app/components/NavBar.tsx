"use client";
import { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemText, CircularProgress 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Initialize Supabase (Ensure these env vars are in your .env file)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check auth state on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home after logout
    router.refresh();
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

        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: { xs: 1, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
          GameMarket
        </Typography>

        {/* DESKTOP NAV LINKS */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navLinks.map((link) => (
            <Button key={link.title} color="inherit" href={link.path}>{link.title}</Button>
          ))}
        </Box>

        {/* AUTH LOGIC */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : user ? (
            <>
              {/* Logged In View */}
              <Button href="/dashboard" sx={{ color: "secondary.main", fontWeight: 'bold' }}>Dashboard</Button>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                onClick={handleLogout}
                sx={{ borderRadius: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Logged Out View */}
              <Button href="/login" sx={{ color: "#c7d2fe", display: { xs: 'none', sm: 'block' } }}>Login</Button>
              <Button variant="contained" href="/signup" sx={{ bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" } }}>
                Sign Up
              </Button>
            </>
          )}
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
            
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/dashboard">
                    <ListItemText primary="Dashboard" sx={{ color: 'secondary.main' }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component="a" href="/login">
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