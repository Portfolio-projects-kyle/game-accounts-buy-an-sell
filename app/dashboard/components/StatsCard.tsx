import { Paper, Typography, Box } from "@mui/material";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, icon, color = "primary.main" }: StatsCardProps) {
  return (
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderLeft: `4px solid`, borderColor: color }}>
      <Box sx={{ color: color, display: 'flex' }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
      </Box>
    </Paper>
  );
}