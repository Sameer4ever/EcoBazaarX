// This interface corresponds to your backend's OrderItemDTO.java
export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

// This interface corresponds to your backend's OrderDTO.java
export interface Order {
  orderId: number;
  buyerName: string;
  // You can define a more specific type for shippingAddress if needed
  shippingAddress: object;
  totalPrice: number;
  status: string;
  createdAt: string; // This will be an ISO date string from the backend
  orderItems: OrderItem[];
}

