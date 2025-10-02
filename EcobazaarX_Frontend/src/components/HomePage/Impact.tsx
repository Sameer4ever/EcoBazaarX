import { TreePine, Droplets, Zap, Recycle, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import carbonImage from "@/assets/1.jpeg";

const impactStats = [
  { icon: TreePine, value: "50,000+", label: "Trees Planted", color: "text-green-600" },
  { icon: Droplets, value: "2M+", label: "Liters Water Saved", color: "text-blue-600" },
  { icon: Zap, value: "75%", label: "Renewable Energy", color: "text-yellow-600" },
  { icon: Recycle, value: "95%", label: "Recyclable Materials", color: "text-primary" }
];

const certifications = [
  "B-Corp Certified",
  "Carbon Neutral",
  "Fair Trade",
  "Organic Certified"
];

const Impact = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Environmental Impact</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Making a Real <span className="text-gradient">Difference</span> Together
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every purchase you make contributes to our mission of creating a more 
              sustainable future. See the positive impact we're making together.
            </p>

            {/* Impact Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {impactStats.map((stat, index) => (
                <Card key={index} className="eco-card border-0">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="font-bold text-xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Our Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={carbonImage} 
                alt="Environmental impact visualization"
                // className="w-full h-auto object-cover float"
              />
            </div>
            
            {/* Floating Stats
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 eco-card">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500 pulse-eco"></div>
                <div>
                  <div className="font-bold text-sm">Carbon Negative</div>
                  <div className="text-xs text-muted-foreground">Since 2020</div>
                </div>
              </div>
            </div> */}
            
            {/* <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 eco-card">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-bold text-sm">1M+ Customers</div>
                  <div className="text-xs text-muted-foreground">Worldwide</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;