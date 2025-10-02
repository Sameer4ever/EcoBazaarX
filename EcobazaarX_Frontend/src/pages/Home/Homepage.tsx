import Header from "@/components/HomePage/Header";
import Hero from "@/components/HomePage/Hero";
import FeaturedProducts from "@/components/HomePage/FeaturedProducts";
import Impact from "@/components/HomePage/Impact";
import Newsletter from "@/components/HomePage/Newsletter";
import Footer from "@/components/HomePage/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {/* <FeaturedProducts /> */}
        <Impact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;