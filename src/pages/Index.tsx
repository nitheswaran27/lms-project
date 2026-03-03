import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Shield, GraduationCap, ArrowRight, Users, Award, PlayCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(79,70,229,0.1)_0%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10 hero-mesh opacity-60" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-primary mb-8 border border-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Transform Your Future Today</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-7xl lg:leading-[1.1]"
            >
              Master New Skills with <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">World-Class Courses</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            >
              LearnHub is the ultimate destination for interactive learning. 
              Get certified through expert-led video lessons and real-world assessments.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
              >
                <GraduationCap className="h-5 w-5" />
                Student Portal
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-border glass px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-muted active:scale-95"
              >
                Explore Catalog
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 glass rounded-3xl p-8 border-border">
            {[
              { icon: BookOpen, label: "Premium Courses", value: "12+" },
              { icon: Users, label: "Active Students", value: "2.5K+" },
              { icon: PlayCircle, label: "Learning Hours", value: "120+" },
              { icon: Award, label: "Certificates", value: "1.8K+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:border-r border-border last:border-0"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-display text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Everything you need to excel</h2>
            <p className="mt-4 text-lg text-muted-foreground">Our platform is designed to provide the most effective learning experience.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                icon: PlayCircle, 
                title: "4K Video Content", 
                desc: "High-quality video lessons with interactive transcripts and chapter-based learning.",
                color: "bg-blue-500/10 text-blue-500" 
              },
              { 
                icon: Award, 
                title: "Verified Certification", 
                desc: "Earn blockchain-verifiable certificates that you can share directly to LinkedIn and your resume.",
                color: "bg-emerald-500/10 text-emerald-500"
              },
              { 
                icon: Shield, 
                title: "Expert Mentorship", 
                desc: "Access premium support from industry veterans who bring real-world experience to your screen.",
                color: "bg-indigo-500/10 text-indigo-500"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Quick Access */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-accent p-12 overflow-hidden relative group">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">Are you an Instructor?</h2>
                <p className="text-white/80 text-lg max-w-md">Manage your curriculum, track student engagement, and publish new content from the admin suite.</p>
              </div>
              <Link to="/admin-login">
                <Button size="lg" variant="secondary" className="font-bold px-10 h-14 rounded-xl">
                  Admin Portal
                  <Shield className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-display text-2xl font-bold mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            LearnHub
          </div>
          <p className="text-muted-foreground">© 2026 LearnHub Education Platform. Elevating skills worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

// Simple internal Button helper if component is missing
const Button = ({ children, className, variant, size, ...props }: any) => {
  const variants: any = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-white text-primary hover:bg-white/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes: any = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant || 'primary']} ${sizes[size || 'default']} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Index;
