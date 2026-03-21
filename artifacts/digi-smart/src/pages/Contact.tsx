import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { locations } from "@/data/mock";
import { MapPin, Phone, User, Mail, Globe2, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "", message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully",
        description: "A representative will contact you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", country: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            With offices around the globe, our team is ready to assist you with your digital signage needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-8">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input 
                        required type="text" name="name" value={formData.name} onChange={handleChange}
                        className="w-full bg-input/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input 
                        required type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full bg-input/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full bg-input/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Country / Region</label>
                    <div className="relative">
                      <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input 
                        type="text" name="country" value={formData.country} onChange={handleChange}
                        className="w-full bg-input/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea 
                    required name="message" value={formData.message} onChange={handleChange} rows={5}
                    className="w-full bg-input/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Global Offices */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-bold text-white mb-6">Global Offices</h3>
            
            <div className="grid gap-4">
              {locations.map((loc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {loc.region}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground pl-7">
                    <p className="leading-relaxed">{loc.address}</p>
                    <p className="text-white/80"><span className="text-muted-foreground">Contact:</span> {loc.contact}</p>
                    <p className="text-primary font-medium">{loc.phone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
