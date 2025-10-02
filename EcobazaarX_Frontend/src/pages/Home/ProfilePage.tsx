import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigate, Link } from 'react-router-dom';
import { LoaderCircle, ServerCrash, ShoppingCart, XCircle } from 'lucide-react';

// ✅ --- Using your project's actual imports ---
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/HomePage/Header';
import Footer from '../../components/HomePage/Footer';
import { Order, OrderItem } from '../../types/Order'; // Assuming you have a types file

// --- API FUNCTIONS ---
const fetchMyOrders = async (token: string): Promise<Order[]> => {
    const response = await fetch('http://localhost:8081/api/orders/my-orders', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch orders from the server.');
    return response.json();
};

const cancelOrderRequest = async ({ orderId, token }: { orderId: number; token: string }) => {
    const response = await fetch(`http://localhost:8081/api/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel order');
    }
    return response.json();
};


// --- PROFILE PAGE COMPONENT ---
const ProfilePage: React.FC = () => {
    const { token, logout, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();

    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['myOrders'],
        queryFn: () => fetchMyOrders(token!),
        enabled: !!token,
    });
    
    const { mutate: cancelOrder, isPending: isCancelling } = useMutation({
        mutationFn: (orderId: number) => cancelOrderRequest({ orderId, token: token! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myOrders'] });
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        }
    });

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-grow">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                    <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-500">
                        Sign Out
                    </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md border">
                    <h2 className="text-xl font-semibold mb-6">Order History</h2>
                    {isLoading && (
                        <div className="flex justify-center items-center py-10">
                            <LoaderCircle className="animate-spin h-8 w-8 text-indigo-600" />
                        </div>
                    )}
                    {isError && (
                        <div className="text-center py-10 text-red-600">
                            <ServerCrash className="h-10 w-10 mx-auto mb-2" />
                            <p>Could not load your orders.</p>
                        </div>
                    )}
                    {orders && orders.length > 0 && (
                        <div className="space-y-8">
                            {orders.map(order => {
                                const isCancellable = order.status === 'PENDING_APPROVAL' || order.status === 'APPROVED';
                                return (
                                <div key={order.orderId} className="border-t pt-6 first:border-t-0 first:pt-0">
                                    <div className="md:flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-lg text-gray-800">Order #{order.orderId}</p>
                                            <p className="text-sm text-gray-600">Buyer: <span className="font-medium">{order.buyerName}</span></p>
                                            <p className="text-sm text-gray-600">Status: <span className="font-medium text-yellow-600">{order.status}</span></p>
                                        </div>
                                        <div className="text-left md:text-right mt-2 md:mt-0">
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="text-lg font-semibold text-gray-800">Total: ₹{order.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Items in this order
                                        </h4>
                                        <ul className="pl-6 space-y-1 border-l-2">
                                            {order.orderItems.map(item => (
                                                <li key={item.productId} className="text-sm text-gray-600 flex justify-between pr-2">
                                                    <span>{item.quantity} x {item.productName}</span>
                                                    <span className="font-mono">₹{(item.quantity * item.price).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {isCancellable && (
                                        <div className="mt-4 text-right">
                                            <button
                                                onClick={() => cancelOrder(order.orderId)}
                                                disabled={isCancelling}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {isCancelling ? (
                                                    <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                )}
                                                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )})}
                        </div>
                    )}
                     {orders && orders.length === 0 && (
                        <p className="text-center text-gray-500 py-10">You haven't placed any orders yet.</p>
                     )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;

