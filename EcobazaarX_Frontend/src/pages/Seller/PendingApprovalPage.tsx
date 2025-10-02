import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function PendingApprovalPage() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin'; // Redirect to sign-in page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        <HourglassEmptyIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h5" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Your Account is Under Review
        </Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Thank you for signing up with EcoBazaarX! Our team is currently reviewing your application.
        </Typography>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}

