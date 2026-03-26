import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Match the legacy/real site IA (from digi-smart.com)
const links: Array<
  | { label: string; path: string; children?: Array<{ label: string; path: string }> }
> = [
  {
    label: "Outdoor",
    path: "/outdoor-category/",
    children: [
      { label: "VENT Serie", path: "/outdoor-vent-series/" },
      { label: "MX Serie", path: "/outdoor-mx-series/" },
      { label: "HDR Serie", path: "/outdoor-hdr-series/" },
      { label: "HD FIT Serie", path: "/outdoor-fit-series/" },
      { label: "Mesh C-Vent Serie", path: "/outdoor-cvent-serie/" },
      { label: "Court Serie", path: "/outdoor-court-series/" },
    ],
  },
  {
    label: "Indoor",
    path: "/indoor-category/",
    children: [
      { label: "ICE Serie", path: "/indoor-ice-series/" },
      { label: "IC Serie", path: "/indoor-ic-series/" },
      { label: "C Banners", path: "/indoor-c-banners/" },
      { label: "C Mesh", path: "/indoor-c-mesh/" },
      { label: "Hospitality & Home Serie", path: "/indoor-hospitality-home/" },
      { label: "Self Standing", path: "/indoor-self-standing/" },
    ],
  },
  {
    label: "Mesh & Clear Screens",
    path: "/mesh-clear-category/",
    children: [
      { label: "C Mesh", path: "/mesh-clear-c-mesh/" },
      { label: "C Banners", path: "/mesh-clear-c-banners/" },
      { label: "C Vent Serie", path: "/mesh-c-vent-serie/" },
    ],
  },
  {
    label: "Hospitality & Home Cinemas",
    path: "/hospitality-home-category/",
    children: [
      { label: "HHOC Serie", path: "/hospitality-hhoc-serie/" },
      { label: "HHIC Serie", path: "/hospitality-hhic-serie/" },
    ],
  },
  { label: "Street Furniture", path: "/street-furniture/" },
  { label: "Holograms", path: "/holograms-3d/" },
  { label: "Contact Us", path: "/contact/" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOpenGroup(null);
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
            {links.map((link) => {
              const active = location === link.path;
              const hasChildren = Boolean(link.children?.length);

              if (!hasChildren) {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative py-2",
                      active ? "text-white" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <div key={link.path} className="relative group">
                  <Link
                    href={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative py-2 inline-flex items-center gap-1",
                      active ? "text-white" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                    <div className="min-w-64 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-2">
                        {link.children!.map((c) => (
                          <Link
                            key={c.path}
                            href={c.path}
                            className="block rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link 
              href="/become-a-dealer/"
              className="ml-4 px-5 py-2.5 rounded-full font-medium text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 flex items-center gap-2 group"
            >
              Become a Dealer
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
            <nav className="flex flex-col gap-3 mt-8">
              {links.map((link) => {
                const hasChildren = Boolean(link.children?.length);
                const isOpen = mobileOpenGroup === link.path;

                if (!hasChildren) {
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        "text-2xl font-display font-medium p-4 rounded-xl transition-all border",
                        location === link.path
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "text-muted-foreground hover:text-white hover:bg-white/5 border-transparent"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <div key={link.path} className="rounded-xl border border-white/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMobileOpenGroup(isOpen ? null : link.path)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 text-left text-2xl font-display font-medium transition-colors",
                        isOpen ? "bg-white/5 text-white" : "text-muted-foreground hover:text-white hover:bg-white/5",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={cn("w-6 h-6 transition-transform", isOpen ? "rotate-180" : "")} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white/[0.02]"
                        >
                          <div className="px-4 pb-4">
                            {/* Category landing link */}
                            <Link
                              href={link.path}
                              className="block rounded-lg px-3 py-3 text-base font-semibold text-white/90 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              View all {link.label}
                            </Link>

                            <div className="mt-2 space-y-1">
                              {link.children!.map((c) => (
                                <Link
                                  key={c.path}
                                  href={c.path}
                                  className="block rounded-lg px-3 py-3 text-base text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                                >
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/become-a-dealer/"
                className="mt-6 px-6 py-4 rounded-xl font-bold text-center bg-gradient-to-r from-primary to-accent text-white shadow-lg"
              >
                Become a Dealer
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
