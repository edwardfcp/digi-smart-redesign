import { Link } from "wouter";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                DIGI<span className="text-primary">-</span>SMART
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Global leaders in premium digital signage, LED/LCD displays, and futuristic 3D hologram solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Solutions</h4>
            <ul className="space-y-3">
              {['Retail & POS', 'Outdoor Advertising', 'Hospitality', 'Street Furniture', 'Events'].map(item => (
                <li key={item}>
                  <Link href="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {['Outdoor Displays', 'Indoor Displays', 'Mesh & Clear', '3D Holograms'].map(item => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>North America:<br />1-888-376-2781</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@digi-smart.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Global offices in USA, PR, China, Spain, DR.</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Digi-Smart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
