import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
// Note: Ensure you have installed the data grid package by running: npm install @mui/x-data-grid
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Interface for our simplified inventory data
interface InventoryRow {
  id: number;
  name: string;
  stock: number;
}

export default function InventoryPage() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Authentication token not found. Please log in again.");
        }
        const response = await fetch("http://localhost:8081/seller/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch inventory data from the server.");
        const data: InventoryRow[] = await response.json();
        setRows(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Product ID',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1, // takes remaining space
    },
    {
      field: 'stock',
      headerName: 'Stock Level',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      // Use cellClassName to apply conditional styling
      cellClassName: (params) => {
        if (params.value != null && params.value < 10) {
          return 'low-stock';
        }
        return '';
      },
    },
  ];

  if (loading) {
    return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    // The main container is now full-width (no padding).
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* An inner box provides padding for the content. */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          Inventory Overview
        </Typography>
        <Paper sx={{
          height: 600,
          width: '100%',
          // Style for the low-stock class applied via cellClassName
          '& .low-stock': {
            color: '#d32f2f',
            fontWeight: 'bold',
          },
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            disableRowSelectionOnClick
            autoHeight // Adjusts height to the content
          />
        </Paper>
      </Box>
    </Box>
  );
}

