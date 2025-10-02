import React from 'react';
// --- CORRECTED IMPORT PATH ---
import { PaymentDetails } from '@/types/Checkout';

interface PaymentFormProps {
  payment: PaymentDetails;
  setPayment: React.Dispatch<React.SetStateAction<PaymentDetails>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, setPayment }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPayment(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 gap-y-6">
            <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on card</label>
                <input type="text" name="cardName" id="cardName" value={payment.cardName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                <input type="text" name="cardNumber" id="cardNumber" value={payment.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                    <input type="text" name="expDate" id="expDate" value={payment.expDate} onChange={handleChange} placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input type="text" name="cvv" id="cvv" value={payment.cvv} onChange={handleChange} placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;

