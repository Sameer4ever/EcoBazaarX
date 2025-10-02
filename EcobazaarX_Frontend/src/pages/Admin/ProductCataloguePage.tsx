import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

interface ProductRow {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  carbonEmission: number;
  sellerBusinessName: string;
}

interface SellerRow {
  id: number;
  name: string;
  email: string;
  businessName: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [sellers, setSellers] = useState<SellerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const token = localStorage.getItem("token");

  // ---------------- Fetch Products ----------------
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch products. Status: ${res.status}`);
      const data: ProductRow[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Fetch Sellers ----------------
  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/admin/sellers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch sellers. Status: ${res.status}`);
      const data: SellerRow[] = await res.json();
      setSellers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 0) fetchProducts();
    else fetchSellers();
  }, [tab]);

  // ---------------- Delete Product ----------------
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to delete product. Status: ${res.status}`);
      setSnackbar({ message: "Product deleted successfully ✅", severity: "success" });
      fetchProducts();
    } catch (err: any) {
      setSnackbar({ message: err.message, severity: "error" });
    }
  };

  // ---------------- Delete Seller ----------------
  const handleDeleteSeller = async (id: number) => {
    if (!window.confirm("Delete this seller permanently?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/admin/sellers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to delete seller. Status: ${res.status}`);
      setSnackbar({ message: "Seller deleted successfully ✅", severity: "success" });
      fetchSellers();
    } catch (err: any) {
      setSnackbar({ message: err.message, severity: "error" });
    }
  };

  // ---------------- Columns ----------------
  const productColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "sellerBusinessName", headerName: "Seller", flex: 1 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price ($)", width: 120, type: "number" },
    { field: "stock", headerName: "Stock", width: 100, type: "number" },
    { field: "carbonEmission", headerName: "CO₂ (kg)", width: 120, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton color="error" onClick={() => handleDeleteProduct(params.row.id)}>
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ];

  const sellerColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "businessName", headerName: "Business Name", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton color="error" onClick={() => handleDeleteSeller(params.row.id)}>
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ];

  // ---------------- Render ----------------
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Products" />
        <Tab label="Sellers" />
      </Tabs>

      {loading && <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && tab === 0 && (
        <Paper sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={productColumns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
          />
        </Paper>
      )}

      {!loading && !error && tab === 1 && (
        <Paper sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={sellers}
            columns={sellerColumns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
          />
        </Paper>
      )}

      {snackbar && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={() => setSnackbar(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbar(null)} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
