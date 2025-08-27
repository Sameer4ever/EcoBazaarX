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
    title: 'Revenue',
    value: '$1.2M',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      12000, 15000, 14000, 16000, 15500, 17000, 16500, 18000, 17500, 19000,
      20000, 21000, 22000, 21500, 22500, 23000, 24000, 23500, 24500, 25000,
      25500, 26000, 26500, 27000, 27500, 28000, 29000, 29500, 30000, 31000,
    ],
  },

  {
    title: 'Orders',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
   {
    title: 'Average Order Value',
    value: '$54',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      40, 45, 50, 48, 55, 52, 54, 57, 56, 58, 60, 62, 61, 59, 58, 57, 56, 55,
      54, 53, 52, 51, 50, 52, 54, 55, 56, 57, 58, 60,
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
