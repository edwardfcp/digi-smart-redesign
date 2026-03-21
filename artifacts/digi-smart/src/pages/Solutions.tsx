import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Retail & POS",
    desc: "Transform window displays and in-store environments into captivating visual experiences that drive foot traffic and increase sales conversions.",
    features: ["Transparent window meshes", "High-brightness storefront LEDs", "Interactive product holograms"],
    img: "cat-mesh.png"
  },
  {
    title: "Outdoor Advertising",
    desc: "Dominate the skyline with massive, brilliant LED billboards built to withstand extreme weather while delivering perfect clarity day or night.",
    features: ["IP65+ weather resistance", "Energy-efficient dynamic dimming", "Seamless corner capabilities"],
    img: "cat-outdoor.png"
  },
  {
    title: "Transportation & Street",
    desc: "Smart city integrations for bus shelters, subway stations, and public plazas that provide wayfinding, advertising, and public information.",
    features: ["Vandal-proof glass", "Integrated cooling systems", "Remote content management"],
    img: "cat-street.png"
  }
];

const BASE_URL = import.meta.env.BASE_URL;

export default function Solutions() {
  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Industry <span className="text-primary">Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We engineer targeted digital display ecosystems tailored for the specific demands of your industry.
          </p>
        </div>

        <div className="space-y-32">
          {solutions.map((sol, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 relative z-10 shadow-2xl">
                    <img 
                      src={`${BASE_URL}images/${sol.img}`} 
                      alt={sol.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {sol.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {sol.desc}
                  </p>
                  
                  <ul className="space-y-4 pt-4">
                    {sol.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        <span className="text-white text-lg">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <button className="px-8 py-3 rounded-xl font-medium border border-primary/50 text-primary hover:bg-primary/10 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </PageTransition>
  );
}
