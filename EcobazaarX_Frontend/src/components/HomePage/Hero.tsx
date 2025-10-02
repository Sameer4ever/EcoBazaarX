import { ArrowRight, Leaf, Recycle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-sustainable.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Sustainable lifestyle products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-primary pulse-eco"></div>
            <span className="text-sm font-medium text-primary">
              Carbon Neutral Shopping
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Shop <span className="text-gradient">Sustainable</span>,
            <br />
            Live Better
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover eco-friendly products that help reduce your carbon
            footprint while supporting sustainable brands committed to our
            planet's future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/AllProductsPage">
              <Button size="lg" className="btn-eco group">
                Explore Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Learn More
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div className="font-bold text-2xl text-foreground">50k+</div>
              <div className="text-sm text-muted-foreground">Trees Saved</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary" />
              </div>
              <div className="font-bold text-2xl text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Recyclable</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="font-bold text-2xl text-foreground">1M+</div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
