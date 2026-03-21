import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Solutions", path: "/solutions" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "glass-panel py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <span className="font-display font-bold text-xl text-primary-foreground">D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              DIGI<span className="text-primary">-</span>SMART
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  location === link.path ? "text-white" : "text-muted-foreground"
                )}
              >
                {link.label}
                {location === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="ml-4 px-5 py-2.5 rounded-full font-medium text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 flex items-center gap-2 group"
            >
              Get Quote
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 pb-8 px-4 flex flex-col"
          >
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-2xl font-display font-medium p-4 rounded-xl transition-all",
                    location === link.path
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-8 px-6 py-4 rounded-xl font-bold text-center bg-gradient-to-r from-primary to-accent text-white shadow-lg"
              >
                Get Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
