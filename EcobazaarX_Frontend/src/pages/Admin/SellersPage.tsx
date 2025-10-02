import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Enum to match the backend UserStatus
enum UserStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

// Interface for our seller data
interface SellerRow {
  sellerId: number;
  email: string;
  businessName: string;
  registrationDate: string;
  status: UserStatus;
}

// Helper to style the status chips
const statusChipProps = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return { label: 'Active', color: 'success' as const };
    case UserStatus.PENDING_APPROVAL:
      return { label: 'Pending', color: 'warning' as const };
    case UserStatus.SUSPENDED:
      return { label: 'Suspended', color: 'error' as const };
    default:
      return { label: 'Unknown', color: 'default' as const };
  }
};

export default function SellersPage() {
  const [sellers, setSellers] = useState<SellerRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' } | null>(null);

  // State for the actions menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSeller, setSelectedSeller] = useState<SellerRow | null>(null);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming you store the admin token
      const response = await fetch('/api/admin/sellers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sellers.');
      }
      const data: SellerRow[] = await response.json();
      setSellers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, seller: SellerRow) => {
    setAnchorEl(event.currentTarget);
    setSelectedSeller(seller);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSeller(null);
  };

  const handleUpdateStatus = async (newStatus: UserStatus) => {
    if (!selectedSeller) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/sellers/${selectedSeller.sellerId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update seller status.');
      }
      
      fetchSellers();
      setSnackbar({ open: true, message: 'Seller status updated successfully!', severity: 'success' });

    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
        handleMenuClose();
    }
  };

  const handleDeleteSeller = async () => {
    if (!selectedSeller) return;
    // In a real app, use a custom modal dialog instead of window.confirm
    if (!confirm(`Are you sure you want to reject and delete the application for ${selectedSeller.businessName}? This action cannot be undone.`)) {
        return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/sellers/${selectedSeller.sellerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete seller.');
      }
      
      fetchSellers();
      setSnackbar({ open: true, message: 'Seller application rejected and deleted.', severity: 'success' });

    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
        handleMenuClose();
    }
  };

  const columns: GridColDef[] = [
    { field: 'sellerId', headerName: 'ID', width: 90 },
    { field: 'businessName', headerName: 'Business Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'registrationDate',
      headerName: 'Registration Date',
      width: 200,
      renderCell: (params: GridRenderCellParams) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const chipProps = statusChipProps(params.value as UserStatus);
        return <Chip label={chipProps.label} color={chipProps.color} size="small" />;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row as SellerRow)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Seller Management
      </Typography>
      <Paper sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={sellers}
          columns={columns}
          getRowId={(row) => row.sellerId}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </Paper>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {selectedSeller?.status === 'PENDING_APPROVAL' && [
          <MenuItem key="approve" onClick={() => handleUpdateStatus(UserStatus.ACTIVE)}>
            <ListItemIcon><CheckCircleOutlineIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Approve</ListItemText>
          </MenuItem>,
          <MenuItem key="reject" onClick={handleDeleteSeller} sx={{ color: 'error.main' }}>
            <ListItemIcon><DeleteForeverIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Reject & Delete</ListItemText>
          </MenuItem>
        ]}
        {selectedSeller?.status === 'ACTIVE' && (
          <MenuItem onClick={() => handleUpdateStatus(UserStatus.SUSPENDED)}>
            <ListItemIcon><BlockIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Suspend</ListItemText>
          </MenuItem>
        )}
        {selectedSeller?.status === 'SUSPENDED' && (
          <MenuItem onClick={() => handleUpdateStatus(UserStatus.ACTIVE)}>
            <ListItemIcon><RestoreIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Reactivate</ListItemText>
          </MenuItem>
        )}
      </Menu>
      {snackbar && (
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbar(null)} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

