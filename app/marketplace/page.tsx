"use client";
import { 
  Grid, Card, CardMedia, CardContent, Typography, 
  Box, Chip, Button, Stack, TextField, InputAdornment 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import SellIcon from "@mui/icons-material/Sell";

const MOCK_ACCOUNTS = [
  { id: 1, game: "Valorant", title: "Ascendant 3 - 25 Premium Skins", price: 120, img: "https://placehold.co/600x400/2b124a/fff?text=Valorant" },
  { id: 2, game: "League of Legends", title: "Diamond IV - All Champions", price: 85, img: "https://placehold.co/600x400/12214a/fff?text=League" },
  { id: 3, game: "CS2", title: "Global Elite - Blue Gem Knife", price: 450, img: "https://placehold.co/600x400/4a2b12/fff?text=CS2" },
];

export default function Marketplace() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Search & Filter Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800">Browse Accounts</Typography>
        <TextField 
          placeholder="Search for skins or games..." 
          size="small"
          sx={{ width: { xs: '100%', sm: 350 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        {MOCK_ACCOUNTS.map((acc) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={acc.id}>
            <Card sx={{ 
              border: '1px solid rgba(255,255,255,0.05)', 
              transition: '0.3s', 
              '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia component="img" height="180" image={acc.img} />
                <Chip 
                  label={acc.game} 
                  color="primary" 
                  size="small" 
                  sx={{ position: 'absolute', bottom: 10, left: 10, fontWeight: 'bold' }} 
                />
              </Box>
              
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1, fontWeight: 600 }}>
                  {acc.title}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip icon={<VerifiedIcon sx={{ fontSize: '14px !important' }} />} label="Verified" size="small" variant="outlined" />
                  <Chip icon={<SellIcon sx={{ fontSize: '14px !important' }} />} label="Fast Delivery" size="small" variant="outlined" />
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" color="secondary.main" fontWeight="800">
                    ${acc.price}
                  </Typography>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}