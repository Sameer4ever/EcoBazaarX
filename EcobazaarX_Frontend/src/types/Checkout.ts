// --- Defines the structures for the checkout form data ---

export interface AddressDetails {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

