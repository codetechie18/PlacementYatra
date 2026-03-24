import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, Building2, Brain, TrendingUp, Zap } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import StatCard from "../components/StatCard";

const branchData = [
  { name: "CSE", placed: 120 },
  { name: "IT", placed: 95 },
  { name: "ECE", placed: 80 },
  { name: "ME", placed: 60 },
  { name: "EE", placed: 45 },
  { name: "CE", placed: 35 },
];

const pieData = [
  { name: "Internships", value: 340 },
  { name: "Placements", value: 520 },
];

const growthData = [
  { year: "2019", placements: 280 },
  { year: "2020", placements: 310 },
  { year: "2021", placements: 390 },
  { year: "2022", placements: 450 },
  { year: "2023", placements: 520 },
  { year: "2024", placements: 610 },
];

const skillData = [
  { name: "React", value: 35 },
  { name: "Python", value: 28 },
  { name: "Java", value: 20 },
  { name: "ML/AI", value: 17 },
];

const topCompanies = [
  { name: "Google", hires: 45 },
  { name: "Microsoft", hires: 38 },
  { name: "Amazon", hires: 32 },
  { name: "TCS", hires: 65 },
  { name: "Infosys", hires: 55 },
];

const COLORS = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const insights = [
  { icon: Brain, text: "CSE has the highest placement rate at 92%", color: "text-violet-500" },
  { icon: Zap, text: "React is the most demanded skill this year", color: "text-blue-500" },
  { icon: TrendingUp, text: "Placement rate increased by 18% vs last year", color: "text-emerald-500" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><StatCard title="Total Students" value="1,245" icon={Users} trend={12} variant="purple" /></motion.div>
        <motion.div variants={item}><StatCard title="Placed Students" value="892" icon={UserCheck} trend={18} variant="green" /></motion.div>
        <motion.div variants={item}><StatCard title="Active Internships" value="340" icon={Briefcase} trend={8} variant="orange" /></motion.div>
        <motion.div variants={item}><StatCard title="Companies Visited" value="76" icon={Building2} trend={5} variant="blue" /></motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Placement per Branch</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="placed" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Internship vs Placement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="glass-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Placement Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Line type="monotone" dataKey="placements" stroke="#7c3aed" strokeWidth={3} dot={{ fill: "#7c3aed", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Skill Demand</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={skillData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {skillData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Companies + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Recruiting Companies</h3>
          <div className="space-y-3">
            {topCompanies.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.hires} hires</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${(c.hires / 65) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">🤖 Smart Insights</h3>
          <div className="space-y-4">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <ins.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${ins.color}`} />
                <p className="text-sm text-foreground">{ins.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
