import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Globe2, Users, Award, Zap } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

export default function About() {
  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-24 border border-white/10">
          <div className="absolute inset-0 z-0">
            <img 
              src={`${BASE_URL}images/about-hero.png`} 
              alt="Global Network" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80"></div>
          </div>
          
          <div className="relative z-10 py-24 px-8 md:px-16 lg:py-32 text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
              Pioneering Visual <span className="text-primary">Excellence</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              Digi-Smart is a premier global manufacturer and integrator of advanced digital signage, specializing in LED, LCD, and holographic display technologies.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { icon: <Globe2 />, value: "5", label: "Global Offices" },
            { icon: <Users />, value: "500+", label: "Enterprise Clients" },
            { icon: <Award />, value: "15+", label: "Years Experience" },
            { icon: <Zap />, value: "50k+", label: "Screens Deployed" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-4xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that physical spaces should be as dynamic and engaging as the digital world. Our mission is to provide businesses with the most reliable, brilliant, and innovative display hardware available on the market.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our manufacturing hubs in Asia to our distribution and support centers in North America, LATAM, and Europe, we control the entire quality chain to ensure flawless execution for every project.
            </p>
            <div className="pt-4">
              <div className="inline-block p-[1px] rounded-xl bg-gradient-to-r from-primary to-accent">
                <div className="bg-background px-8 py-4 rounded-xl">
                  <p className="font-bold text-white">"Quality is not an act, it is a habit."</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             {/* using stock image for this contextual shot as requested sparingly */}
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" 
              alt="Hardware" 
              className="rounded-2xl object-cover w-full h-full aspect-square border border-white/10"
            />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" 
              alt="Tech Data" 
              className="rounded-2xl object-cover w-full h-full aspect-square border border-white/10 translate-y-8"
            />
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
