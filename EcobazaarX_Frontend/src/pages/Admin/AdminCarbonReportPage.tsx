import * as React from 'react';
import { useState, useEffect } from 'react'; // ✅ Import useState and useEffect
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TypeScript Interfaces ---
interface SellerLeaderboardEntry {
  sellerName: string;
  averageFootprint: number;
  totalInventoryFootprint: number;
  productCount: number;
}

interface AdminCarbonStats {
  totalMarketplaceFootprint: number;
  platformAverageFootprint: number;
  lowImpactProductCount: number;
  sellerLeaderboard: SellerLeaderboardEntry[];
  footprintByCategory: Record<string, number>;
}

// --- API Fetch Function ---
const fetchAdminCarbonReport = async (token: string): Promise<AdminCarbonStats> => {
  const response = await fetch('http://localhost:8081/api/admin/stats/carbon-report', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch admin report (${response.status})`);
  return response.json();
};

// --- Child Components ---
const StatCard = ({ title, value, unit }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
        {value} <Typography component="span" variant="h6">{unit}</Typography>
      </Typography>
    </CardContent>
  </Card>
);

// --- Main Component ---
export default function AdminCarbonReportPage() {
  // ✅ FIX: State to hold the real token from localStorage
  const [token, setToken] = useState<string | null>(null);

  // ✅ FIX: Effect hook to read the token when the component loads
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const { data, isLoading, isError, error } = useQuery<AdminCarbonStats, Error>({
    queryKey: ['adminCarbonReport', token],
    queryFn: () => fetchAdminCarbonReport(token!),
    // The query will only run once the token has been loaded from localStorage
    enabled: !!token,
  });

  const kpis = [
    { title: "Total Marketplace Footprint", value: data?.totalMarketplaceFootprint?.toFixed(2), unit: "kg CO₂" },
    { title: "Platform Average Footprint", value: data?.platformAverageFootprint?.toFixed(2), unit: "kg CO₂ / Product" },
    { title: "Low Impact Products", value: data?.lowImpactProductCount, unit: "(< 1kg CO₂)" },
  ];
  
  const categoryData = data ? Object.entries(data.footprintByCategory).map(([name, value]) => ({ name, footprint: value })) : [];

  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Sellers Carbon Report
      </Typography>
      
      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpis.map((kpi, i) => (
          <Grid item xs={12} md={4} key={i}>
            {isLoading ? <Skeleton variant="rectangular" height={100} /> : <StatCard {...kpi} />}
          </Grid>
        ))}
      </Grid>

      {/* Leaderboard and Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Typography variant="h6" gutterBottom>Eco-Seller Leaderboard</Typography>
          {isLoading ? <Skeleton variant="rectangular" height={400} /> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell align="right">Avg. Footprint</TableCell>
                    <TableCell align="right">Total Inventory Footprint</TableCell>
                    <TableCell align="right">Products</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.sellerLeaderboard.map((seller, index) => (
                    <TableRow key={seller.sellerName}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{seller.sellerName}</TableCell>
                      <TableCell align="right">{seller.averageFootprint.toFixed(2)} kg</TableCell>
                      <TableCell align="right">{seller.totalInventoryFootprint.toFixed(2)} kg</TableCell>
                      <TableCell align="right">{seller.productCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid item xs={12} lg={5}>
          <Typography variant="h6" gutterBottom>Footprint by Category</Typography>
          {isLoading ? <Skeleton variant="rectangular" height={400} /> : (
              <Paper sx={{height: 400, p: 2}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="footprint" fill="#8884d8" name="Total Footprint (kg CO₂)" />
                    </BarChart>
                </ResponsiveContainer>
             </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

