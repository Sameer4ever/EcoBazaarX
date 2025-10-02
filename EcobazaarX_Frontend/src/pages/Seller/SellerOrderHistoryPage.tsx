import React from 'react';
import { useQuery } from '@tanstack/react-query';
// ✅ IMPORT your actual useAuth hook
import { useAuth } from '../../context/AuthContext'; // Adjust path if needed

// --- Material-UI Imports ---
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// --- TYPE DEFINITIONS (matching your SellerOrderDTO) ---
interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

interface SellerOrder {
    orderId: number;
    buyerName: string;
    buyerEmail: string;
    shippingAddress: Address;
    totalPrice: number;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
}

// --- API FUNCTION ---
const fetchOrderHistory = async (token: string): Promise<SellerOrder[]> => {
    const response = await fetch('http://localhost:8081/api/seller/orders/history', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch order history.');
    }
    return response.json();
};

// --- MAIN COMPONENT ---
const SellerOrderHistoryPage: React.FC = () => {
    // ✅ USE the real useAuth hook to get the token
    const { token } = useAuth();

    const { data: orders, isLoading, isError, error } = useQuery<SellerOrder[], Error>({
        queryKey: ['sellerOrderHistory'],
        queryFn: () => fetchOrderHistory(token!),
        enabled: !!token,
    });

    const getStatusChipColor = (status: string): "warning" | "info" | "success" | "primary" | "error" | "default" => {
        switch (status) {
            case 'PENDING_APPROVAL': return 'warning';
            case 'APPROVED': return 'info';
            case 'SHIPPED': return 'success';
            case 'DELIVERED': return 'primary';
            case 'CANCELLED': return 'error';
            default: return 'default';
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (isError) {
        return <Alert severity="error" icon={<ErrorOutlineIcon />}>Error fetching history: {error.message}</Alert>;
    }

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Typography variant="h4" gutterBottom component="h1">
                Order History
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                A complete record of all past and completed orders.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {orders?.map((order) => (
                    <Accordion key={order.orderId}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}><Typography fontWeight="bold">Order #{order.orderId}</Typography></Grid>
                                <Grid item xs={12} sm={3}><Typography>Buyer: {order.buyerName}</Typography></Grid>
                                <Grid item xs={6} sm={3}><Typography>Total: ${order.totalPrice.toFixed(2)}</Typography></Grid>
                                <Grid item xs={6} sm={3}><Chip label={order.status} color={getStatusChipColor(order.status)} size="small" /></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
                            <Box sx={{ borderTop: '1px solid #eee', pt: 2 }}>
                                <Typography variant="h6" gutterBottom>Order Details</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Shipping Address</Typography>
                                        <Typography variant="body2">{order.shippingAddress.street}</Typography>
                                        <Typography variant="body2">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</Typography>
                                        <Typography variant="body2">{order.shippingAddress.country}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>Email: {order.buyerEmail}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TableContainer component={Paper} variant="outlined">
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Product</TableCell>
                                                        <TableCell align="right">Quantity</TableCell>
                                                        <TableCell align="right">Price</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.orderItems.map((item) => (
                                                        <TableRow key={item.productId}>
                                                            <TableCell>{item.productName}</TableCell>
                                                            <TableCell align="right">{item.quantity}</TableCell>
                                                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                 {orders && orders.length === 0 && (
                    <Typography sx={{ textAlign: 'center', p: 4, color: 'text.secondary' }}>
                        No order history found.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SellerOrderHistoryPage;

