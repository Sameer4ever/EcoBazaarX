import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SessionsChart from './SessionsChart';
import PageViewsBarChart from './PageViewsBarChart';
import StatCard, { StatCardProps } from './StatCard';

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Orders count',
    value: '22k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      401, 875, 1425, 1413, 197, 606, 931, 11, 930, 62, 699, 1137, 689, 1025,
      887, 1270, 305, 578, 1089, 1110, 516, 171, 1132, 460, 340, 487, 168, 1255,
      1401, 430,
    ],
  },
];

// Eco Funnel Card (combined stats in one box)
function EcoFunnelCard() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Eco Funnel
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Last 30 days
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Typography variant="body2">🌱 Eco Interest → <b>32%</b> of users viewed eco products</Typography>
          <Typography variant="body2">🛒 Eco Engagement → <b>12%</b> of users added to wishlist/cart</Typography>
          <Typography variant="body2">✅ Eco Orders → <b>8%</b> of users purchased</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}

        {/* Eco Funnel Card */}
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <EcoFunnelCard />
        </Grid>

        {/* Charts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}
