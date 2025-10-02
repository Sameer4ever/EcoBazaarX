import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from '@/context/AuthContext'; // ✅ Using real AuthContext

// --- TYPE DEFINITION ---
interface Product {
    productId: number;
    name: string;
    category: string;
    price: number;
    imagePath: string; // Keep for potential future use, but won't be displayed
}

// --- API Fetch Function ---
const fetchTopSellingProducts = async (token: string): Promise<Product[]> => {
    const response = await fetch('http://localhost:8081/seller/product/top-selling?limit=5', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch top selling products');
    }
    return response.json();
};


const TopSellingProductsPage: React.FC = () => {
    const { token } = useAuth();

    const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
        queryKey: ['topSellingProducts', token], // Include token in key to refetch on auth change
        queryFn: () => fetchTopSellingProducts(token!),
        enabled: !!token, // Only run the query if the token exists
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <Card className="shadow-lg border-gray-200">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">
                        Top Selling Products
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        An overview of your best-performing products, ranked by sales volume.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-16">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                                <p className="ml-4 text-gray-600">Loading top products...</p>
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col justify-center items-center py-16 bg-red-50 text-red-700 rounded-lg">
                                <AlertCircle className="w-8 h-8" />
                                <p className="mt-4 font-semibold">An Error Occurred</p>
                                <p className="text-sm">{error?.message}</p>
                            </div>
                        ) : !products || products.length === 0 ? (
                            <div className="flex justify-center items-center py-16">
                                <p className="text-gray-600">No sales data available to determine top products.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-200">
                                        {/* ✅ Image column removed */}
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.productId} className="hover:bg-gray-50">
                                            {/* ✅ Image cell removed */}
                                            <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{product.category}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">${product.price.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Mock shadcn/ui components for self-contained functionality ---
const badgeVariants = {
  outline: "border border-gray-300 text-gray-700",
  default: "bg-gray-900 text-white",
};

const Badge = ({ className, variant = "default", ...props }: { className?: string; variant?: keyof typeof badgeVariants; [key: string]: any }) => {
  return (
    <div
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeVariants[variant]} ${className}`}
      {...props}
    />
  );
};

export default TopSellingProductsPage;

