import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Skeleton } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

// --- Child Components ---

const StatCard = ({ title, value, interval }) => (
  <Card
    variant="outlined"
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CardContent sx={{ flexGrow: 1, p: 5 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', mt: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {interval}
      </Typography>
    </CardContent>
  </Card>
);

const ProductsByCategoryChart = ({ data, total }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Products by Category
        </Typography>
        <Box sx={{ height: 280, mt: 2, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={85}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} products`} />
              <Legend
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {total}
            </Typography>
            <Typography variant="caption">Products</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CarbonSavedChartCard = ({ value, interval }) => {
  const chartData = [
    { name: 'Day 1', saved: 20 },
    { name: 'Day 5', saved: 45 },
    { name: 'Day 10', saved: 60 },
    { name: 'Day 15', saved: 80 },
    { name: 'Day 20', saved: 95 },
    { name: 'Day 25', saved: 120 },
    { name: 'Day 30', saved: 150 },
  ];
  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 6 }}>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Carbon Saved Trend
        </Typography>
        <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mt: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {interval}
        </Typography>
        <Box sx={{ flexGrow: 1, mt: 3, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="saved"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

// --- TypeScript Interface, API Function, and Helper ---
interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCarbonSaved: number;
  productsByCategory: Record<string, number>;
  totalProducts: number;
  ecoFriendlyProductPercentage: number;
}

const fetchDashboardStats = async (
  token: string
): Promise<DashboardStats> => {
  const response = await fetch(
    'http://localhost:8081/api/seller/stats/dashboard',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }
  return response.json();
};

const formatNumber = (num: number) => {
  if (!num) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
  return num.toString();
};

// --- Main Dashboard Component ---
export default function SellerDashboardHomepage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const { data, isLoading, isError, error } = useQuery<DashboardStats, Error>({
    queryKey: ['dashboardStats', token],
    queryFn: () => fetchDashboardStats(token!),
    enabled: !!token,
  });

  const statCards = [
    { title: 'Revenue', value: data ? `$${formatNumber(data.totalRevenue)}` : '...' },
    { title: 'Orders', value: data ? formatNumber(data.totalOrders) : '...' },
    { title: 'Average Order Value', value: data ? `$${data.averageOrderValue.toFixed(2)}` : '...' },
    { title: 'Carbon Saved', value: data ? `${data.totalCarbonSaved.toFixed(2)} kg CO₂` : '...' },
  ];

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Failed to load dashboard data. Error: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {/* Top Row: Stat Cards */}
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={140} />
            ) : (
              <StatCard title={card.title} value={card.value} interval="Last 30 days" />
            )}
          </Grid>
        ))}

        {/* Bottom Row: Charts */}
        {/* ✅ FIX: Changed both bottom grid items to md={6} to make them equal width */}
        <Grid item xs={12} md={6}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={380} />
            ) : (
              <CarbonSavedChartCard
                value={`${data?.totalCarbonSaved.toFixed(2) || 0} kg CO₂`}
                interval="Trend over the last 30 days"
              />
            )}
        </Grid>

        <Grid item xs={12} md={6}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={380} />
            ) : (
              <ProductsByCategoryChart
                data={data?.productsByCategory || {}}
                total={data?.totalProducts || 0}
              />
            )}
        </Grid>
      </Grid>
    </Box>
  );
}

