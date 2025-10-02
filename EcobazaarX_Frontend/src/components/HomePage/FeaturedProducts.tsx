import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import productsImage from "@/assets/products-eco.jpg";

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: "$12.99",
    originalPrice: "$16.99",
    rating: 4.8,
    reviews: 324,
    image: productsImage,
    badge: "Best Seller",
    carbonSaved: "2.3kg CO₂"
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    price: "$19.99",
    originalPrice: "$24.99",
    rating: 4.9,
    reviews: 156,
    image: productsImage,
    badge: "Eco Choice",
    carbonSaved: "1.8kg CO₂"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: "$24.99",
    originalPrice: "$29.99",
    rating: 4.7,
    reviews: 89,
    image: productsImage,
    badge: "New",
    carbonSaved: "5.2kg CO₂"
  },
  {
    id: 4,
    name: "Solar Power Bank",
    price: "$39.99",
    originalPrice: "$49.99",
    rating: 4.6,
    reviews: 234,
    image: productsImage,
    badge: "Trending",
    carbonSaved: "8.7kg CO₂"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-nature">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Eco Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked sustainable products that make a real difference for our planet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="eco-card group cursor-pointer border-0">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-accent/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs font-medium text-accent-foreground">
                        Carbon Saved: {product.carbonSaved}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full btn-eco text-xs py-2 group">
                    <ShoppingCart className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;