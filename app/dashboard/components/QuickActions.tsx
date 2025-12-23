import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function QuickActions() {
  const actions = [
    { label: "Profile", icon: <AccountCircleIcon />, link: "/profile" },
    { label: "Messages", icon: <MessageIcon />, link: "/messages" },
    { label: "KYC Verify", icon: <VerifiedUserIcon />, link: "/verify" },
    { label: "Settings", icon: <SettingsIcon />, link: "/settings" },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Quick Actions</Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid size={{ xs: 6 }} key={index}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={action.icon}
              sx={{ 
                justifyContent: 'flex-start', 
                py: 1, 
                borderColor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(0, 245, 212, 0.05)', borderColor: 'secondary.main' }
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}