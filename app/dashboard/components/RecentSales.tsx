import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Chip } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';

const sales = [
  { id: 1, title: "Level 50 Apex Legends", price: "$45", date: "2 hours ago", status: "Completed" },
  { id: 2, title: "Steam Region-Free Account", price: "$12", date: "Yesterday", status: "Pending" },
  { id: 3, title: "Diamond Rank LoL Account", price: "$80", date: "3 days ago", status: "Completed" },
];

export default function RecentSales() {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
        <HistoryIcon color="secondary" /> Recent Activity
      </Typography>
      <List disablePadding>
        {sales.map((sale, index) => (
          <div key={sale.id}>
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'rgba(157, 78, 221, 0.1)', color: 'primary.main' }}>
                  {sale.title[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={sale.title} 
                secondary={sale.date} 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 700, mr: 2 }}>
                {sale.price}
              </Typography>
              <Chip 
                label={sale.status} 
                size="small" 
                variant="outlined"
                color={sale.status === "Completed" ? "success" : "warning"}
              />
            </ListItem>
            {index < sales.length - 1 && <Divider component="li" sx={{ opacity: 0.1 }} />}
          </div>
        ))}
      </List>
    </Paper>
  );
}