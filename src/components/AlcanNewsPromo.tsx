import { Newspaper, ArrowRight, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AlcanNewsPromo = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6 md:p-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Content */}
              <div className="text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">Coming Soon</span>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Alcan News
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Your source for Interior Alaska news, events, and community stories. 
                    Stay connected with what matters most to the Alcan region.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <a 
                      href="https://alcannews.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="aurora" size="lg" className="group w-full sm:w-auto">
                        <Bell className="w-4 h-4 mr-2" />
                        Get Notified
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-[280px] mx-auto">
                  {/* Animated rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-accent/30"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                      <Newspaper className="w-12 h-12 md:w-14 md:h-14 text-white" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-4 right-8 w-10 h-10 rounded-lg bg-mountain-slate/80 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-white text-xs font-bold">AK</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-8 left-4 w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-border/50 text-center"
            >
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">alcannews.com</span> — Launching Soon
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlcanNewsPromo;
