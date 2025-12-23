import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";

const mockData = [
  { id: 1, game: "Valorant", rank: "Immortal", price: "$120", status: "Active" },
  { id: 2, game: "League of Legends", rank: "Diamond IV", price: "$85", status: "Sold" },
];

export default function AccountTable() {
  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Your Listings</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Game</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Rank/Level</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.game}</TableCell>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <Chip 
                  label={row.status} 
                  size="small" 
                  color={row.status === "Active" ? "secondary" : "default"} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}