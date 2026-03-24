import { motion } from "framer-motion";
import { Star, Users, MapPin, ExternalLink } from "lucide-react";

const companies = [
  { name: "Google", logo: "G", package: "₹45 LPA", skills: ["DSA", "System Design", "React"], rating: 4.8, hires: 45, location: "Bangalore" },
  { name: "Microsoft", logo: "M", package: "₹42 LPA", skills: ["C++", "Azure", "ML"], rating: 4.7, hires: 38, location: "Hyderabad" },
  { name: "Amazon", logo: "A", package: "₹38 LPA", skills: ["Java", "AWS", "Distributed"], rating: 4.5, hires: 32, location: "Bangalore" },
  { name: "Stripe", logo: "S", package: "₹55 LPA", skills: ["Ruby", "React", "Payments"], rating: 4.9, hires: 12, location: "Remote" },
  { name: "TCS", logo: "T", package: "₹7 LPA", skills: ["Java", "SQL", "Testing"], rating: 3.8, hires: 65, location: "Multiple" },
  { name: "Infosys", logo: "I", package: "₹6.5 LPA", skills: ["Java", "Python", "SAP"], rating: 3.7, hires: 55, location: "Pune" },
  { name: "Flipkart", logo: "F", package: "₹32 LPA", skills: ["Java", "Kafka", "React"], rating: 4.4, hires: 20, location: "Bangalore" },
  { name: "Razorpay", logo: "R", package: "₹28 LPA", skills: ["Go", "React", "Fintech"], rating: 4.6, hires: 15, location: "Bangalore" },
];

export default function Companies() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Companies</h1>
        <p className="text-sm text-muted-foreground">{companies.length} partner companies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {c.logo}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold text-foreground">{c.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-gradient">{c.package}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> {c.hires} hires</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {c.skills.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
