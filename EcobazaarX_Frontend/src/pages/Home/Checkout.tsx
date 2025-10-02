    import React, { useState } from 'react';
    import { useCart } from '@/context/CartContext';
    import { useAuth } from '@/context/AuthContext';
    import { Link, useNavigate } from 'react-router-dom';
    import Header from '@/components/HomePage/Header';
    import Footer from '@/components/HomePage/Footer';
    import { CreditCard } from 'lucide-react';

    // --- Reusable Form Field Component ---
    const FormField: React.FC<{
        label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string; type?: string; fullWidth?: boolean;
    }> = ({ label, name, value, onChange, required = false, placeholder = '', type = 'text', fullWidth = false }) => (
        <div className={fullWidth ? 'sm:col-span-2' : ''}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}{required && ' *'}</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
    );

    // --- Address Step Component (Corrected) ---
    const AddressStep: React.FC<{ address: any; setAddress: Function }> = ({ address, setAddress }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
        };
        return (
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <FormField label="First name" name="firstName" value={address.firstName} onChange={handleChange} required />
                <FormField label="Last name" name="lastName" value={address.lastName} onChange={handleChange} required />
                <FormField label="Address line 1" name="address1" value={address.address1} onChange={handleChange} required fullWidth />
                <FormField label="Address line 2 (Optional)" name="address2" value={address.address2} onChange={handleChange} fullWidth />
                <FormField label="City" name="city" value={address.city} onChange={handleChange} required />
                <FormField label="State / Province" name="state" value={address.state} onChange={handleChange} required />
                <FormField label="ZIP / Postal code" name="zip" value={address.zip} onChange={handleChange} required />
                <FormField label="Country" name="country" value={address.country} onChange={handleChange} required />
            </div>
        );
    };

    // --- Payment Step Component ---
    const PaymentStep: React.FC<{ payment: any; setPayment: Function }> = ({ payment, setPayment }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPayment((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
        };
        return (
            <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-gray-500" />
                    <div>
                        <h3 className="font-medium">Credit Card</h3>
                        <p className="text-sm text-gray-500">Secure payment with your credit card.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-6">
                    <FormField label="Name on card" name="cardName" value={payment.cardName} onChange={handleChange} required fullWidth/>
                    <FormField label="Card number" name="cardNumber" value={payment.cardNumber} onChange={handleChange} required placeholder="0000 0000 0000 0000" fullWidth/>
                    <div className="grid grid-cols-2 gap-x-4">
                        <FormField label="Expiration date (MM/YY)" name="expDate" value={payment.expDate} onChange={handleChange} required placeholder="MM/YY" />
                        <FormField label="CVV" name="cvv" value={payment.cvv} onChange={handleChange} required placeholder="123" />
                    </div>
                </div>
            </div>
        );
    };

    // --- Review Step Component (Corrected) ---
    const ReviewStep: React.FC<{ address: any; payment: any }> = ({ address, payment }) => (
        <div className="space-y-6 text-sm">
            <div>
                <h3 className="font-medium text-gray-900">Shipping Information</h3>
                <p className="text-gray-600">{address.firstName} {address.lastName}</p>
                <p className="text-gray-600">{address.address1}{address.address2 ? `, ${address.address2}` : ''}</p>
                <p className="text-gray-600">{address.city}, {address.state} {address.zip}, {address.country}</p>
            </div>
            <div>
                <h3 className="font-medium text-gray-900">Payment Details</h3>
                <p className="text-gray-600">Cardholder: {payment.cardName}</p>
                <p className="text-gray-600">Card Number: **** **** **** {payment.cardNumber.slice(-4)}</p>
            </div>
        </div>
    );

    const steps = ["Shipping address", "Payment details", "Review your order"];

    // --- MAIN CHECKOUT PAGE ---
    const Checkout: React.FC = () => {
        const [activeStep, setActiveStep] = useState(0);
        const { cartItems, cartTotal, clearCart } = useCart();
        const { token, isAuthenticated } = useAuth();
        const navigate = useNavigate();

        const [address, setAddress] = useState({ firstName: '', lastName: '', address1: '', address2: '', city: '', state: '', zip: '', country: '' });
        const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expDate: '', cvv: '' });
        const [isPlacingOrder, setIsPlacingOrder] = useState(false);

        const handleNext = () => setActiveStep((prev) => prev + 1);
        const handleBack = () => setActiveStep((prev) => prev - 1);

        const handlePlaceOrder = async () => {
            setIsPlacingOrder(true);
            const payload = {
                orderItems: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
                shippingAddress: { ...address },
            };
            try {
                const response = await fetch('http://localhost:8081/api/orders', {
                    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error('Order placement failed.');
                clearCart();
                handleNext();
            } catch (error) {
                console.error("Order error:", error);
                alert("Failed to place order.");
            } finally {
                setIsPlacingOrder(false);
            }
        };

        if (!isAuthenticated) {
            return <div className="flex flex-col items-center justify-center min-h-screen"><p>Please sign in to continue.</p><Link to="/signin" className="text-indigo-600">Sign In</Link></div>;
        }

        if (!cartItems.length && activeStep < steps.length) {
            return <div className="flex flex-col items-center justify-center min-h-screen"><p>Your cart is empty.</p><Link to="/AllProductsPage" className="text-indigo-600">Start Shopping</Link></div>;
        }

        return (
            <div className="bg-gray-50 min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side: Form */}
                        <div className="bg-white p-8 rounded-lg shadow-md border">
                            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 mb-8">
                                {steps.map((label, index) => (
                                    <li key={label} className={`flex md:w-full items-center ${index < activeStep ? 'text-green-600' : ''} ${index > 0 ? "before:content-[''] before:w-full before:h-1 before:border-b before:border-gray-200 before:border-1 before:mx-4" : ''}`}>
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${index <= activeStep ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                                            {index < activeStep ? '✓' : index + 1}
                                        </span>
                                    </li>
                                ))}
                            </ol>

                            {activeStep === steps.length ? (
                                <div className="text-center py-10">
                                    <h2 className="text-2xl font-bold text-green-600">Thank you for your order!</h2>
                                    <p className="mt-2 text-gray-600">Your order has been placed and is pending approval.</p>
                                    <button onClick={() => navigate('/')} className="mt-6 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700">Back to Homepage</button>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">{steps[activeStep]}</h2>
                                    {activeStep === 0 && <AddressStep address={address} setAddress={setAddress} />}
                                    {activeStep === 1 && <PaymentStep payment={payment} setPayment={setPayment} />}
                                    {activeStep === 2 && <ReviewStep address={address} payment={payment} />}
                                    <div className="flex justify-between mt-8">
                                        {activeStep > 0 && <button onClick={handleBack} className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-300">Back</button>}
                                        <button onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext} disabled={isPlacingOrder} className="ml-auto rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400">
                                            {isPlacingOrder ? 'Placing Order...' : (activeStep === steps.length - 1 ? 'Place Order' : 'Next')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Right Side: Order Summary */}
                        <div className="bg-white p-8 rounded-lg shadow-md border h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map(item => (
                                    <li key={item.productId} className="flex items-center py-4">
                                        <img src={`http://localhost:8081/uploads/${item.imagePath?.split(/[\\/]/).pop()}`} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                                        <div className="flex-grow"><p className="font-medium text-gray-800">{item.name}</p><p className="text-sm text-gray-500">Qty: {item.quantity}</p></div>
                                        <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 border-t pt-6 text-sm">
                                <div className="flex justify-between text-gray-600"><p>Subtotal</p><p>₹{cartTotal.toFixed(2)}</p></div>
                                <div className="flex justify-between text-gray-600 mt-2"><p>Shipping</p><p>Free</p></div>
                                <div className="flex justify-between text-base font-bold text-gray-900 mt-4"><p>Total</p><p>₹{cartTotal.toFixed(2)}</p></div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    };

    export default Checkout;

