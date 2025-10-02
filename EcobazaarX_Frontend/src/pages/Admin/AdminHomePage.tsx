import * as React from 'react';
import { Box, Typography } from '@mui/material';
import MainGrid from '../../components/AdminDashboard/MainGrid';

const Header = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h1">
      Admin Dashboard Overview
    </Typography>
  </Box>
);


// This component now serves as the main "Home" page for the admin dashboard.
export default function AdminHomePage() {
  return (
    <>
      <Header />
      <MainGrid />
    </>
  );
}

