import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  Fade,
  ButtonGroup,
  Button,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// --- Icon Imports ---
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Co2OutlinedIcon from '@mui/icons-material/Co2Outlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// (StatCard component and SellerCarbonReport interface remain the same)
interface SellerCarbonReport { sellerEmail: string; totalProducts: number; totalCarbonEmission: number; avgCarbonEmission: number; highestEmissionProduct: string; lowestEmissionProduct: string; categoryWiseCarbon: { [key: string]: number }; stockAdjustedCarbon: number; }
const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%', borderColor: '#e0e0e0' }}>
        <Box sx={{ p: 2, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, color: '#fff', mr: 2, }}>{icon}</Box>
        <Box><Typography color="text.secondary">{title}</Typography><Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}> {value} </Typography></Box>
    </Paper>
);


export default function CarbonInsightReportPage() {
  const [report, setReport] = useState<SellerCarbonReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('all');

  useEffect(() => {
    // (The data fetching logic remains exactly the same as before)
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      const today = new Date();
      let startDate, endDate;
      endDate = today.toISOString().split('T')[0];
      if (timeRange !== 'all') {
          const pastDate = new Date();
          let daysToSubtract = 7;
          if (timeRange === '30d') daysToSubtract = 30;
          if (timeRange === '90d') daysToSubtract = 90;
          pastDate.setDate(today.getDate() - daysToSubtract);
          startDate = pastDate.toISOString().split('T')[0];
      }
      let url = "http://localhost:8081/seller/report/carbon-insight";
      if (startDate && endDate) {
          const params = new URLSearchParams({ startDate, endDate });
          url += `?${params.toString()}`;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to fetch report: ${response.status} ${errorData}`);
        }
        const data: SellerCarbonReport = await response.json();
        setReport(data);
      } catch (err: any)        {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [timeRange]);

  const chartData = useMemo(() => {
    if (!report?.categoryWiseCarbon) return [];
    return Object.entries(report.categoryWiseCarbon).map(([category, value]) => ({
      category,
      "Carbon (kg CO₂)": parseFloat(value.toFixed(2)),
    }));
  }, [report]);

  // (Loading and Error states are the same...)
  if (loading && !report) { return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ ml: 2, color: 'text.secondary' }}>Loading Carbon Report...</Typography></Box>; }


  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh', position: 'relative' }}>
        
        {loading && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
            <Typography sx={{ ml: 2, color: 'text.secondary' }}>Loading...</Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Carbon Insight Dashboard
          </Typography>
          <ButtonGroup variant="outlined">
              <Button onClick={() => setTimeRange('7d')} variant={timeRange === '7d' ? 'contained' : 'outlined'}>7 Days</Button>
              <Button onClick={() => setTimeRange('30d')} variant={timeRange === '30d' ? 'contained' : 'outlined'}>30 Days</Button>
              <Button onClick={() => setTimeRange('90d')} variant={timeRange === '90d' ? 'contained' : 'outlined'}>90 Days</Button>
              <Button onClick={() => setTimeRange('all')} variant={timeRange === 'all' ? 'contained' : 'outlined'}>All Time</Button>
          </ButtonGroup>
        </Box>

        {error && <Alert severity="error" sx={{mb: 2}}><strong>Failed to load report:</strong> {error}</Alert>}

        <Box>
            {report && (
            <>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}> <StatCard icon={<Inventory2OutlinedIcon/>} title="Total Products" value={`${report.totalProducts}`} color="#0288d1" /> </Grid>
                    <Grid item xs={12} sm={6} md={3}> <StatCard icon={<Co2OutlinedIcon/>} title="Total Carbon" value={`${report.totalCarbonEmission.toFixed(2)} kg CO₂`} color="#d32f2f"/> </Grid>
                    <Grid item xs={12} sm={6} md={3}> <StatCard icon={<FunctionsOutlinedIcon/>} title="Avg Carbon / Product" value={`${report.avgCarbonEmission.toFixed(2)} kg CO₂`} color="#f57c00" /> </Grid>
                    <Grid item xs={12} sm={6} md={3}> <StatCard icon={<WarehouseOutlinedIcon/>} title="Stock Adjusted Footprint" value={`${report.stockAdjustedCarbon.toFixed(2)} kg CO₂`} color="#388e3c" /> </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <Paper variant="outlined" sx={{ p: 3, height: '450px', borderColor: '#e0e0e0' }}>
                             <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Category Emissions</Typography>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                    <XAxis dataKey="category" stroke="#555" />
                                    <YAxis stroke="#555" />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} labelStyle={{ color: '#000' }}/>
                                    <Legend />
                                    <Bar dataKey="Carbon (kg CO₂)" fill={theme.palette.primary.main} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Paper variant="outlined" sx={{ p: 3, mb: 3, borderColor: '#e0e0e0' }}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><TrendingUpIcon sx={{ color: 'error.main', mr: 1 }} /><Typography variant="h6" component="h3">Highest Emission</Typography></Box><Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>{report.highestEmissionProduct || "N/A"}</Typography></Paper>
                        <Paper variant="outlined" sx={{ p: 3, borderColor: '#e0e0e0' }}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><TrendingDownIcon sx={{ color: 'success.main', mr: 1 }} /><Typography variant="h6" component="h3">Lowest Emission</Typography></Box><Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>{report.lowestEmissionProduct || "N/A"}</Typography></Paper>
                    </Grid>
                </Grid>
            </>
            )}
        </Box>
      </Box>
    </Fade>
  );
}

