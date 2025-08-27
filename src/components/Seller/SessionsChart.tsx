import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function CarbonSavedChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  // Example daily carbon savings (kg CO₂)
  const ecoProducts = [
    50, 60, 55, 70, 75, 90, 95, 100, 105, 120,
    110, 115, 130, 140, 150, 160, 155, 165, 175, 185,
    180, 190, 200, 210, 220, 225, 235, 240, 250, 260,
  ];
  const greenPackaging = [
    20, 25, 22, 28, 30, 32, 35, 37, 40, 42,
    38, 45, 47, 50, 55, 58, 60, 62, 65, 67,
    70, 72, 75, 78, 80, 82, 85, 87, 90, 95,
  ];
  const logisticsOptimization = [
    15, 18, 20, 22, 25, 28, 30, 32, 34, 36,
    35, 37, 40, 42, 44, 46, 48, 50, 52, 54,
    56, 58, 60, 62, 64, 66, 68, 70, 72, 75,
  ];

  const totalCarbonSaved =
    ecoProducts.reduce((a, b) => a + b, 0) +
    greenPackaging.reduce((a, b) => a + b, 0) +
    logisticsOptimization.reduce((a, b) => a + b, 0);

  const colorPalette = [
    theme.palette.success.light,
    theme.palette.success.main,
    theme.palette.success.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Carbon Saved
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {totalCarbonSaved.toLocaleString()} kg CO₂
            </Typography>
            <Chip size="small" color="success" label="+18%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Carbon saved per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (value, index) => (index + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 60 }]}
          series={[
            {
              id: 'ecoProducts',
              label: 'Eco-friendly Products',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: ecoProducts,
            },
            {
              id: 'greenPackaging',
              label: 'Sustainable Packaging',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: greenPackaging,
            },
            {
              id: 'logisticsOptimization',
              label: 'Logistics Optimization',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: logisticsOptimization,
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-ecoProducts': {
              fill: "url('#ecoProducts')",
            },
            '& .MuiAreaElement-series-greenPackaging': {
              fill: "url('#greenPackaging')",
            },
            '& .MuiAreaElement-series-logisticsOptimization': {
              fill: "url('#logisticsOptimization')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.success.dark} id="ecoProducts" />
          <AreaGradient color={theme.palette.success.main} id="greenPackaging" />
          <AreaGradient color={theme.palette.success.light} id="logisticsOptimization" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
