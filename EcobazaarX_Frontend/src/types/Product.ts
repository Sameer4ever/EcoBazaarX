    export interface Seller {
      sellerId: number;
      name: string;
      email: string;
      businessName: string; // <-- ADDED THIS LINE
    }

    export interface Product {
      productId: number;
      name: string;
      description: string;
      stock: number;
      category: string;
      imagePath: string | null;
      carbonEmission: number;
      price: number;
      createdAt: string;
      isZeroWasteProduct: boolean;
      seller: Seller;
    }
    

