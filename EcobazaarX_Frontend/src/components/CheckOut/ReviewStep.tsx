import React from 'react';
// --- CORRECTED IMPORT PATH ---
import { AddressDetails, PaymentDetails } from '@/types/Checkout';

interface ReviewStepProps {
  address: AddressDetails;
  payment: PaymentDetails;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ address, payment }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
        <div className="mt-2 text-gray-600 text-sm">
          <p>{address.firstName} {address.lastName}</p>
          <p>{address.address1}</p>
          {address.address2 && <p>{address.address2}</p>}
          <p>{address.city}, {address.state} {address.zip}</p>
          <p>{address.country}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        <div className="mt-2 text-gray-600 text-sm">
          <p>Cardholder: {payment.cardName}</p>
          <p>Card Number: **** **** **** {payment.cardNumber.slice(-4)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        By placing this order, you agree to the terms and conditions.
      </p>
    </div>
  );
};

export default ReviewStep;

