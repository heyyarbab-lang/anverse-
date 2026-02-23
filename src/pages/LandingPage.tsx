import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Play, Sparkles, Video, Globe } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-400 mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Next-Gen Quran Video Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Create <span className="text-gradient-emerald">Cinematic</span> Quran <br />
              Recitations in <span className="text-gradient-gold">Seconds</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Transform sacred verses into breathtaking videos. Select from 500+ recitors, 
              stunning 4K backgrounds, and let our engine sync everything perfectly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/studio">
                <Button size="lg" className="w-full sm:w-auto shadow-emerald-500/20 shadow-2xl">
                  <Play className="w-5 h-5 fill-current" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/library">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "500+ Recitors",
                desc: "Access a massive library of world-renowned recitors from Al Quran Cloud."
              },
              {
                icon: Video,
                title: "4K Visuals",
                desc: "Auto-synced stock footage from Pexels matching the mood of the verses."
              },
              {
                icon: Sparkles,
                title: "Auto-Sync",
                desc: "Intelligent timestamp alignment for Arabic text and translations."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
