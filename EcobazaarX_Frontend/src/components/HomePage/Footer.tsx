import { Leaf, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-eco flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">EcoBazaarX</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Leading the sustainable commerce revolution with eco-friendly products 
              that help reduce your carbon footprint while supporting ethical brands 
              committed to our planet's future.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center cursor-pointer transition-colors">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center cursor-pointer transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center cursor-pointer transition-colors">
                <Youtube className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Impact Report</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@ecobazaarx.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-background/60 text-sm mb-4 md:mb-0">
            © 2024 EcoBazaarX. All rights reserved. | Carbon Neutral Certified
          </div>
          <div className="flex space-x-6 text-background/60 text-sm">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;