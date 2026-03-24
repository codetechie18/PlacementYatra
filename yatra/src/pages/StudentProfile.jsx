import { motion } from "framer-motion";
import { ArrowLeft, Star, Mail, Phone, MapPin, Upload, Brain, CheckCircle, Clock, FileText, Award } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const student = {
  name: "Arjun Sharma",
  branch: "CSE",
  cgpa: 9.2,
  email: "arjun@university.edu",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  skills: ["React", "Node.js", "Python", "TypeScript", "Docker", "AWS"],
  backlogs: 0,
  attendance: 92,
  timeline: [
    { step: "Applied", date: "Jan 15", done: true },
    { step: "Aptitude Test", date: "Jan 22", done: true },
    { step: "Technical Round", date: "Feb 3", done: true },
    { step: "HR Round", date: "Feb 10", done: true },
    { step: "Selected", date: "Feb 15", done: true },
  ],
  resumeScore: 82,
  resumeSuggestions: [
    "Add more project descriptions",
    "Include quantified achievements",
    "Optimize for ATS keywords",
    "Add open-source contributions",
  ],
  documents: ["Resume.pdf", "Marksheet_Sem6.pdf", "AWS_Certificate.pdf", "Hackathon_Winner.pdf"],
};

const cgpaData = [8.5, 8.8, 9.0, 9.1, 9.2, 9.2];

export default function StudentProfile() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Link to="/students" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Link>

      {/* Profile Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
            AS
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
              <span className="text-xs px-2 py-1 rounded-full gradient-success text-primary-foreground font-medium">Placed</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{student.branch} • B.Tech 2024</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {student.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {student.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {student.location}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">{student.cgpa}</div>
              <p className="text-xs text-muted-foreground">CGPA</p>
            </div>
            <div className="text-center">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray={`${student.attendance}, 100`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{student.attendance}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Attendance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Skills & Academics */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Backlogs</h3>
            <div className={`text-2xl font-bold ${student.backlogs > 0 ? "text-red-500" : "text-emerald-500"}`}>
              {student.backlogs} {student.backlogs === 0 && "✓"}
            </div>
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">CGPA Trend</h3>
            <div className="flex items-end gap-2 h-20">
              {cgpaData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t gradient-primary" style={{ height: `${(v / 10) * 100}%` }} />
                  <span className="text-[10px] text-muted-foreground">S{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Selection Timeline</h3>
          <div className="space-y-6">
            {student.timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3 relative">
                {i < student.timeline.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-0.5 h-8 bg-border" />
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? "gradient-success" : "bg-muted"}`}>
                  {t.done ? <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" /> : <Clock className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.step}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Resume + Docs */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-violet-500" />
              <h3 className="text-sm font-semibold text-foreground">AI Resume Analyzer</h3>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray={`${student.resumeScore}, 100`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gradient">{student.resumeScore}</span>
              </div>
            </div>
            <div className="space-y-2">
              {student.resumeSuggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-amber-500 mt-0.5">•</span> {s}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Documents</h3>
            <div className="space-y-2">
              {student.documents.map((d) => (
                <div key={d} className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-foreground">{d}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
