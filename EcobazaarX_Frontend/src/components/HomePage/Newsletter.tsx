import { Mail, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 gradient-eco">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated on Sustainability
          </h2>
          
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Join our community of eco-warriors and get exclusive access to new 
            sustainable products, impact reports, and green living tips.
          </p>

          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-2">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex items-center justify-center space-x-6 text-white/90 text-sm">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Exclusive Deals</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Weekly Tips</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/50"></div>
            <span>No Spam Ever</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;