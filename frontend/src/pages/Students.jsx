import { motion } from "framer-motion";
import { Search, Filter, GraduationCap, Mail, Phone, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const studentsData = [
  { id: 1, name: "Arjun Sharma", branch: "CSE", cgpa: 9.2, skills: ["React", "Node.js", "Python"], status: "Placed", company: "Google" },
  { id: 2, name: "Priya Patel", branch: "IT", cgpa: 8.8, skills: ["Java", "Spring", "AWS"], status: "Placed", company: "Microsoft" },
  { id: 3, name: "Rahul Kumar", branch: "ECE", cgpa: 7.5, skills: ["Embedded C", "MATLAB"], status: "Interning", company: "Qualcomm" },
  { id: 4, name: "Sneha Reddy", branch: "CSE", cgpa: 9.5, skills: ["ML", "Python", "TensorFlow"], status: "Placed", company: "Amazon" },
  { id: 5, name: "Vikram Singh", branch: "ME", cgpa: 7.8, skills: ["AutoCAD", "SolidWorks"], status: "Searching", company: null },
  { id: 6, name: "Ananya Gupta", branch: "CSE", cgpa: 8.6, skills: ["React", "TypeScript", "Go"], status: "Placed", company: "Stripe" },
  { id: 7, name: "Karthik Nair", branch: "IT", cgpa: 8.1, skills: ["Django", "PostgreSQL"], status: "Interning", company: "Flipkart" },
  { id: 8, name: "Meera Joshi", branch: "EE", cgpa: 7.2, skills: ["VLSI", "Verilog"], status: "Searching", company: null },
];

const statusColors = {
  Placed: "gradient-success",
  Interning: "gradient-info",
  Searching: "gradient-warning",
};

export default function Students() {
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("All");

  const filtered = studentsData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch === "All" || s.branch === filterBranch;
    return matchSearch && matchBranch;
  });

  const branches = ["All", ...new Set(studentsData.map((s) => s.branch))];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-sm text-muted-foreground">{studentsData.length} total students</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="search-bar">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-xl px-2 py-1">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => setFilterBranch(b)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterBranch === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/students/${student.id}`} className="block">
              <div className="glass-card p-5 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{student.name}</h3>
                      <p className="text-xs text-muted-foreground">{student.branch}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full text-primary-foreground font-medium ${statusColors[student.status]}`}>
                    {student.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-foreground">{student.cgpa}</span>
                  <span className="text-xs text-muted-foreground">CGPA</span>
                  {student.company && (
                    <span className="ml-auto text-xs text-muted-foreground">@ {student.company}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {student.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
