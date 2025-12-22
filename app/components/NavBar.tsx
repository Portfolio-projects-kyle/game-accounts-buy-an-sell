import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#0b0f19",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO / BRAND */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ letterSpacing: "0.5px" }}
        >
          GameMarket
        </Typography>

        {/* NAV LINKS */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/marketplace">
            Marketplace
          </Button>
          <Button color="inherit" href="/sell">
            Sell
          </Button>
        </Box>

        {/* AUTH BUTTONS */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            href="/login"
            sx={{ color: "#c7d2fe" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            href="/signup"
            sx={{
              bgcolor: "#6366f1",
              "&:hover": { bgcolor: "#4f46e5" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
