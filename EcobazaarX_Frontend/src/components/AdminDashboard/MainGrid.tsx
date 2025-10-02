import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  LinearProgress
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- TypeScript Interfaces ---
interface AdminOverviewStats {
  totalUsers: number;
  userGrowthPercentage: number;
  totalOrdersLast30Days: number;
  orderGrowthPercentage: number;
  totalFootprintLast30Days: number;
  footprintGrowthPercentage: number;
  totalProducts: number;
  productsByCategory: Record<string, number>;
  ecoFriendlyProductPercentage: number;
}

// --- API Fetch Function ---
const fetchAdminOverviewStats = async (token: string): Promise<AdminOverviewStats> => {
  const response = await fetch('http://localhost:8081/api/admin/overview', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch admin overview (${response.status})`);
  return response.json();
};

// --- Child Components ---
const StatCard = ({ title, value, growth }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', color: growth >= 0 ? 'success.main' : 'error.main' }}>
        {growth >= 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
        <Typography variant="caption" sx={{ ml: 0.5 }}>
          {growth.toFixed(1)}% vs last 30 days
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const ProductsByCategoryChart = ({ data, total }) => {
  const chartData = data ? Object.entries(data).map(([name, value]) => ({ name, value })) : [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">Products by Category</Typography>
        <Box sx={{ height: 200, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{total}</Typography>
            <Typography variant="caption">Products</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const EcoFriendlyProductsCard = ({ percentage }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">Eco-Friendly Products</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{percentage.toFixed(1)}%</Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 8, borderRadius: 5, mt: 1 }}
      />
    </CardContent>
  </Card>
);

const CarbonFootprintCard = ({ total, growth }) => {
  // Dummy data for the trend chart shape
  const chartData = [{ v: 100 }, { v: 120 }, { v: 110 }, { v: 140 }, { v: 180 }];
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">Total Carbon Footprint</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{total.toFixed(2)} kg CO₂</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: growth >= 0 ? 'error.main' : 'success.main',
          }}
        >
          {growth >= 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {Math.abs(growth).toFixed(1)}% vs last 30 days
          </Typography>
        </Box>
        <Box sx={{ height: 150, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <Area type="monotone" dataKey="v" stroke="#f44336" fill="#f44336" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

// --- Main Component ---
export default function AdminDashboardOverview() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const { data, isLoading, isError, error } = useQuery<AdminOverviewStats, Error>({
    queryKey: ['adminOverview', token],
    queryFn: () => fetchAdminOverviewStats(token!),
    enabled: !!token,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num;
  };

  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Admin Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={120} />
          ) : (
            <StatCard
              title="Users"
              value={formatNumber(data?.totalUsers ?? 0)}
              growth={data?.userGrowthPercentage ?? 0}
            />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={120} />
          ) : (
            <StatCard
              title="Orders count"
              value={formatNumber(data?.totalOrdersLast30Days ?? 0)}
              growth={data?.orderGrowthPercentage ?? 0}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={120} />
          ) : (
            <EcoFriendlyProductsCard percentage={data?.ecoFriendlyProductPercentage ?? 0} />
          )}
        </Grid>

        <Grid item xs={12} md={7}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : (
            <CarbonFootprintCard
              total={data?.totalFootprintLast30Days ?? 0}
              growth={data?.footprintGrowthPercentage ?? 0}
            />
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : (
            <ProductsByCategoryChart
              data={data?.productsByCategory ?? {}}
              total={data?.totalProducts ?? 0}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
