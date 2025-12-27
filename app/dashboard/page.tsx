"use client";

import { Box, Typography, Stack, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  Grid
} from "@mui/material";

// Icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

// Modular Components
import StatsCard from "./components/StatsCard";
import RecentSales from "./components/RecentSales";
import QuickActions from "./components/QuickActions";
import AccountTable from "./components/AccountTable";

// Auth Hook
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const stats = [
    { title: "Total Revenue", value: "$1,450.00", icon: <AccountBalanceWalletIcon fontSize="large" />, color: "#9d4edd" },
    { title: "Active Listings", value: "8", icon: <InventoryIcon fontSize="large" />, color: "#00f5d4" },
    { title: "Seller Rating", value: "4.9 / 5", icon: <StarIcon fontSize="large" />, color: "#ffb703" },
  ];

  // 1. LOADING STATE
  // We keep this because useAuth() takes a split second to hydrate on the client
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // 2. AUTHENTICATED STATE
  // If we reached here, 'user' is guaranteed to exist by middleware.ts
  return (
    <Box sx={{ py: 4 }}>
      {/* --- HEADER SECTION --- */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase' }}>
            User <Box component="span" sx={{ color: 'secondary.main' }}>Dashboard</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Logged in as: <strong>{user?.email}</strong>
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/sell" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
          Sell New Account
        </Button>
      </Stack>

      {/* --- TOP STATS GRID --- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <StatsCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          </Grid>
        ))}
      </Grid>

      {/* --- MAIN CONTENT GRID --- */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <AccountTable />
            <RecentSales />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <QuickActions />
            <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <ShutterSpeedIcon sx={{ color: 'secondary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Seller Level: Pro</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                You are in the top 10% of sellers this month.
              </Typography>
              <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                <Box sx={{ width: '85%', height: '100%', bgcolor: 'secondary.main', borderRadius: 1 }} />
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}