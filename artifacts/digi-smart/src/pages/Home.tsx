import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Globe, Cpu } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { categories, clients } from "@/data/mock";

const BASE_URL = import.meta.env.BASE_URL;

export default function Home() {
  return (
    <PageTransition className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src={`${BASE_URL}videos/hero-bg.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen Display Technology
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
            >
              The Future of <br />
              <span className="text-gradient">Digital Signage</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Transform your physical spaces into dynamic visual experiences with our premium LED & LCD display screens, transparent meshes, and 3D holograms.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/products"
                className="px-8 py-4 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center text-center"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Clients Marquee */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Trusted by global industry leaders
          </p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} className="mx-12 sm:mx-16 flex items-center justify-center">
                <span className="font-display font-bold text-2xl md:text-4xl text-white/20 uppercase tracking-tighter hover:text-white/60 transition-colors cursor-default">
                  {client.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Our <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our comprehensive range of digital display technologies designed for every environment and use case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/products?category=${cat.id}`} className="block group h-full">
                  <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative">
                    {/* Glowing border effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 transition-opacity duration-500 pointer-events-none z-10" />
                    
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      <img 
                        src={`${BASE_URL}images/${cat.image}`} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                      
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h3 className="text-2xl font-display font-bold text-white flex items-center justify-between">
                          {cat.name}
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                            <ArrowRight className="w-5 h-5 text-white group-hover:-rotate-45 transition-transform" />
                          </div>
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <p className="text-muted-foreground leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-card relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Why Partner With <br />
                <span className="text-accent">Digi-Smart</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                With over a decade of innovation, we don't just sell screens; we deliver end-to-end visual experiences that captivate audiences and elevate brands globally.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Zap className="w-6 h-6 text-primary" />, title: "Cutting-Edge Tech", desc: "Latest generation LED & LCD panels with superior brightness, contrast, and energy efficiency." },
                  { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Industrial Reliability", desc: "Built to last with 100,000+ hour lifespans, weatherproofing (IP65+), and robust cooling systems." },
                  { icon: <Globe className="w-6 h-6 text-primary" />, title: "Global Support", desc: "Offices across Asia, North America, Latin America, and Europe ensuring rapid deployment and service." },
                  { icon: <Cpu className="w-6 h-6 text-primary" />, title: "Custom Solutions", desc: "From unique architectural shapes to transparent meshes, if you can imagine it, we can build it." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative z-10">
                {/* using stock image for this contextual shot as requested sparingly */}
                {/* modern corporate tech office space with glowing screens */}
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80" 
                  alt="Digi-Smart Office" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-primary/20 mix-blend-overlay"></div>
              </div>
              
              {/* Floating stat card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-2xl z-20 max-w-[200px]"
              >
                <div className="text-4xl font-display font-bold text-white mb-2">100k+</div>
                <div className="text-sm text-primary font-medium">Hours Lifespan</div>
                <p className="text-xs text-muted-foreground mt-2">Guaranteed operational reliability for all major displays.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-96 bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Contact our global team today to discuss your project requirements and get a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="px-10 py-5 rounded-xl font-bold text-lg bg-white text-background hover:bg-gray-200 shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Contact Sales
            </Link>
            <Link 
              href="/products"
              className="px-10 py-5 rounded-xl font-bold text-lg bg-transparent text-white border border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
