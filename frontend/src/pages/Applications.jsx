import { Briefcase, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const applications = [
  { id: 1, company: "Google", role: "SDE Intern", status: "shortlisted", date: "2025-01-15", package: "₹45 LPA" },
  { id: 2, company: "Microsoft", role: "Software Engineer", status: "applied", date: "2025-01-20", package: "₹38 LPA" },
  { id: 3, company: "Amazon", role: "Backend Developer", status: "selected", date: "2024-12-10", package: "₹42 LPA" },
  { id: 4, company: "Infosys", role: "Systems Engineer", status: "rejected", date: "2024-11-05", package: "₹6.5 LPA" },
  { id: 5, company: "TCS", role: "Developer", status: "applied", date: "2025-02-01", package: "₹7 LPA" },
];

const statusConfig = {
  applied: { label: "Applied", icon: Clock, color: "text-muted-foreground bg-muted" },
  shortlisted: { label: "Shortlisted", icon: ArrowRight, color: "text-primary bg-primary/10" },
  selected: { label: "Selected", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-400/10" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-destructive bg-destructive/10" },
};

export default function Applications() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your internship and placement applications
        </p>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => {
          const st = statusConfig[app.status];
          const Icon = st.icon;
          return (
            <div
              key={app.id}
              className="glass-card rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{app.company}</h3>
                  <p className="text-sm text-muted-foreground">{app.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {app.package}
                </span>
                <span className="text-xs text-muted-foreground hidden md:block">
                  {app.date}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${st.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {st.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
