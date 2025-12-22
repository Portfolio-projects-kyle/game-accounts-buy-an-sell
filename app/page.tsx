"use client";

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0b0f19", color: "#fff" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          background:
            "radial-gradient(circle at top, #1f2937 0%, #0b0f19 60%)",
        }}
      >
        <Box maxWidth="900px">
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={2}
            sx={{ letterSpacing: "-1px" }}
          >
            Buy & Sell Gaming Accounts Safely
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "gray.300", mb: 4, lineHeight: 1.6 }}
          >
            A secure marketplace for gamers to trade high-quality accounts.
            Fast, trusted, and built for players.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="large"
              variant="contained"
              href="/signup"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                bgcolor: "#6366f1",
                "&:hover": { bgcolor: "#4f46e5" },
              }}
            >
              Get Started
            </Button>

            <Button
              size="large"
              variant="outlined"
              href="/login"
              sx={{
                px: 4,
                py: 1.5,
                color: "#fff",
                borderColor: "#6366f1",
                "&:hover": { borderColor: "#4f46e5" },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>

      {/* FEATURES SECTION */}
      <Box sx={{ px: { xs: 3, md: 8 }, py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={6}
        >
          Why Choose Our Marketplace?
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Secure Transactions",
              desc: "Your payments and accounts are protected with modern security standards.",
            },
            {
              title: "Trusted Sellers",
              desc: "Verified users and reviews ensure a safe trading experience.",
            },
            {
              title: "Instant Access",
              desc: "Get your account details immediately after purchase.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "#0f172a",
                  border: "1px solid #1e293b",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 20px 40px rgba(99,102,241,0.15)",
                    borderColor: "#6366f1",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={1}
                    color="#e5e7eb"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5f5",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderTop: "1px solid #1f2937",
          color: "gray.500",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Gaming Marketplace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
