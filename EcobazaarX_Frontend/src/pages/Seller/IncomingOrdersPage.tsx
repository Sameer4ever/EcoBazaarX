import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    FormControl,
    Select,
    MenuItem,
    Button,
    Grid,
    Chip,
    SelectChangeEvent
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

// --- API FUNCTIONS ---
const fetchAllOrders = async (token: string): Promise<SellerOrder[]> => {
    const response = await fetch('http://localhost:8081/api/seller/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orders for seller.');
    }
    return response.json();
};

const updateOrderStatusRequest = async ({ orderId, newStatus, token }: { orderId: number; newStatus: string; token: string }) => {
    const response = await fetch(`http://localhost:8081/api/seller/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newStatus })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status.');
    }
    return response.json();
};

// --- MAIN COMPONENT ---
const IncomingOrdersPage: React.FC = () => {
    // ✅ USE the real useAuth hook to get the token
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const [selectedStatuses, setSelectedStatuses] = useState<{ [key: number]: string }>({});

    const { data: orders, isLoading, isError, error } = useQuery<SellerOrder[], Error>({
        queryKey: ['sellerOrders'],
        queryFn: () => fetchAllOrders(token!),
        enabled: !!token,
    });

    const { mutate: updateStatus, isPending: isUpdating } = useMutation({
        mutationFn: (variables: { orderId: number; newStatus: string }) =>
            updateOrderStatusRequest({ ...variables, token: token! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
        },
        onError: (err) => {
            alert(`Error updating status: ${err.message}`);
        }
    });

    const handleStatusChange = (orderId: number, event: SelectChangeEvent<string>) => {
        setSelectedStatuses(prev => ({ ...prev, [orderId]: event.target.value }));
    };

    const handleUpdateClick = (orderId: number) => {
        const newStatus = selectedStatuses[orderId];
        if (newStatus) {
            updateStatus({ orderId, newStatus });
        }
    };

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
    
    const getValidNextStatuses = (currentStatus: string): { value: string; label: string }[] => {
        switch (currentStatus) {
            case 'PENDING_APPROVAL':
                return [
                    { value: 'APPROVED', label: 'Approve' },
                    { value: 'CANCELLED', label: 'Cancel' }
                ];
            case 'APPROVED':
                return [
                    { value: 'SHIPPED', label: 'Ship' },
                    { value: 'CANCELLED', label: 'Cancel' }
                ];
            case 'SHIPPED':
                return [{ value: 'DELIVERED', label: 'Deliver' }];
            default:
                return []; // No actions for DELIVERED or CANCELLED
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (isError) {
        return <Alert severity="error" icon={<ErrorOutlineIcon />}>Error fetching orders: {error.message}</Alert>;
    }

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Typography variant="h4" gutterBottom component="h1">
                Incoming Orders
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {orders?.map((order) => {
                    const nextStatuses = getValidNextStatuses(order.status);
                    return (
                    <Accordion key={order.orderId} defaultExpanded={order.status === 'PENDING_APPROVAL'}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}><Typography fontWeight="bold">Order #{order.orderId}</Typography></Grid>
                                <Grid item xs={12} sm={3}><Typography>Buyer: {order.buyerName}</Typography></Grid>
                                <Grid item xs={6} sm={3}><Typography>Total: ${order.totalPrice.toFixed(2)}</Typography></Grid>
                                <Grid item xs={6} sm={3}><Chip label={order.status} color={getStatusChipColor(order.status)} size="small" /></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    {nextStatuses.length > 0 && (
                                        <>
                                            <FormControl sx={{ minWidth: 180 }} size="small">
                                                <Select
                                                    value={selectedStatuses[order.orderId] || ''}
                                                    onChange={(e) => handleStatusChange(order.orderId, e)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled><em>Change Status</em></MenuItem>
                                                    {nextStatuses.map(status => (
                                                        <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleUpdateClick(order.orderId)}
                                                disabled={!selectedStatuses[order.orderId] || isUpdating}
                                            >
                                                {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Update'}
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )})}
            </Box>
        </Box>
    );
};

export default IncomingOrdersPage;

