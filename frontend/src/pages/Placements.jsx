import { motion } from "framer-motion";
import { Award, Building2, Calendar, CheckCircle, IndianRupee } from "lucide-react";

const placements = [
  { student: "Arjun Sharma", company: "Google", role: "SDE-1", package: "₹45 LPA", date: "Feb 2024", branch: "CSE" },
  { student: "Priya Patel", company: "Microsoft", role: "SDE-1", package: "₹42 LPA", date: "Jan 2024", branch: "IT" },
  { student: "Sneha Reddy", company: "Amazon", role: "ML Engineer", package: "₹38 LPA", date: "Mar 2024", branch: "CSE" },
  { student: "Ananya Gupta", company: "Stripe", role: "Full Stack", package: "₹55 LPA", date: "Feb 2024", branch: "CSE" },
  { student: "Karthik Nair", company: "Flipkart", role: "Backend Dev", package: "₹32 LPA", date: "Jan 2024", branch: "IT" },
  { student: "Rohit Verma", company: "TCS", role: "Associate", package: "₹7 LPA", date: "Dec 2023", branch: "ME" },
];

const timeline = [
  { phase: "Pre-Placement Talks", date: "Sep 2023", done: true },
  { phase: "Aptitude Tests", date: "Oct 2023", done: true },
  { phase: "Technical Rounds", date: "Nov 2023", done: true },
  { phase: "HR Rounds", date: "Dec 2023", done: true },
  { phase: "Final Offers", date: "Jan-Mar 2024", done: true },
];

export default function Placements() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Placements</h1>
        <p className="text-sm text-muted-foreground">2024 placement season results</p>
      </div>

      {/* Timeline */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Placement Season Timeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${t.done ? "bg-accent" : "bg-muted"}`}>
                <CheckCircle className={`w-4 h-4 ${t.done ? "text-emerald-500" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-xs font-medium text-foreground whitespace-nowrap">{t.phase}</p>
                  <p className="text-[10px] text-muted-foreground">{t.date}</p>
                </div>
              </div>
              {i < timeline.length - 1 && <div className="w-8 h-0.5 bg-border flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {placements.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 gradient-primary opacity-5 rounded-bl-full" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{p.student}</h3>
                <p className="text-xs text-muted-foreground">{p.branch}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Building2 className="w-3 h-3" /> {p.company} — {p.role}</div>
              <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3" /> <span className="text-foreground font-semibold">{p.package}</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {p.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
