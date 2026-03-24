import { motion } from "framer-motion";
import { Clock, IndianRupee, Building2, Calendar } from "lucide-react";

const internships = [
  { title: "Frontend Developer Intern", company: "Google", duration: "6 months", stipend: "₹80K/mo", progress: 75, skills: ["React", "TypeScript"] },
  { title: "ML Research Intern", company: "Microsoft", duration: "3 months", stipend: "₹60K/mo", progress: 40, skills: ["Python", "TensorFlow"] },
  { title: "Backend Intern", company: "Amazon", duration: "6 months", stipend: "₹70K/mo", progress: 90, skills: ["Java", "AWS"] },
  { title: "DevOps Intern", company: "Flipkart", duration: "4 months", stipend: "₹50K/mo", progress: 55, skills: ["Docker", "K8s"] },
  { title: "Data Analyst Intern", company: "Razorpay", duration: "3 months", stipend: "₹45K/mo", progress: 20, skills: ["SQL", "Python"] },
  { title: "Full Stack Intern", company: "Stripe", duration: "6 months", stipend: "₹90K/mo", progress: 65, skills: ["React", "Ruby"] },
];

export default function Internships() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Internships</h1>
        <p className="text-sm text-muted-foreground">{internships.length} active internships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {internships.map((intern, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">{intern.title}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
              <Building2 className="w-3 h-3" /> {intern.company}
            </p>

            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {intern.duration}</span>
              <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> {intern.stipend}</span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium text-foreground">{intern.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${intern.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full gradient-primary"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {intern.skills.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
