import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { Download, Filter } from "lucide-react";

const branchWise = [
  { branch: "CSE", placed: 120, total: 130 },
  { branch: "IT", placed: 95, total: 110 },
  { branch: "ECE", placed: 80, total: 120 },
  { branch: "ME", placed: 60, total: 100 },
  { branch: "EE", placed: 45, total: 85 },
  { branch: "CE", placed: 35, total: 70 },
];

const yearlyTrend = [
  { year: "2020", rate: 65 },
  { year: "2021", rate: 72 },
  { year: "2022", rate: 78 },
  { year: "2023", rate: 82 },
  { year: "2024", rate: 89 },
];

const packageDist = [
  { range: "< 5 LPA", count: 120 },
  { range: "5-10 LPA", count: 250 },
  { range: "10-20 LPA", count: 180 },
  { range: "20-40 LPA", count: 90 },
  { range: "40+ LPA", count: 25 },
];

const COLORS = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Reports() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Analytics & insights</p>
        </div>
        <button className="btn-glow px-4 py-2 rounded-xl text-sm text-primary-foreground font-medium flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Branch-wise Placement</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={branchWise}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="branch" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Legend />
              <Bar dataKey="placed" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Placed" />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total" opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Yearly Placement Rate</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={yearlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} unit="%" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Package Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={packageDist} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis dataKey="range" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={80} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {packageDist.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
