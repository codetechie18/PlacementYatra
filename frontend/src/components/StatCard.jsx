import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, trend, variant = "purple" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`stat-card stat-card-${variant}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend > 0 ? "text-emerald-500" : "text-red-500"}`}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl gradient-${variant === "purple" ? "primary" : variant === "green" ? "success" : variant === "orange" ? "warning" : "info"} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </motion.div>
  );
}
