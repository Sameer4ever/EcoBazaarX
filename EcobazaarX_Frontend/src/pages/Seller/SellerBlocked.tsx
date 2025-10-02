import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';

export default function SellerBlocked() {
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
        <BlockIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h5" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Your Account is Suspended !!
        </Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Contact Admin for further information.
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

