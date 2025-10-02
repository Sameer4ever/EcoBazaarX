import React from 'react';
// --- CORRECTED IMPORT PATH ---
// Now importing from the centralized types file
import { AddressDetails } from '@/types/Checkout';

interface AddressFormProps {
  address: AddressDetails;
  setAddress: React.Dispatch<React.SetStateAction<AddressDetails>>;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, setAddress }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
        <input type="text" name="firstName" id="firstName" value={address.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
        <input type="text" name="lastName" id="lastName" value={address.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address line 1</label>
        <input type="text" name="address1" id="address1" value={address.address1} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address line 2 (Optional)</label>
        <input type="text" name="address2" id="address2" value={address.address2} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input type="text" name="city" id="city" value={address.city} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
        <input type="text" name="state" id="state" value={address.state} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
        <input type="text" name="zip" id="zip" value={address.zip} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
        <input type="text" name="country" id="country" value={address.country} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
    </div>
  );
};

export default AddressForm;

