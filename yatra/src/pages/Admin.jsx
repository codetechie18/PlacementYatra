import { motion } from "framer-motion";
import { Download, Bell, Send, Megaphone, Users, Filter, FileSpreadsheet } from "lucide-react";
import { useState } from "react";

const announcements = [
  { title: "TCS Hiring Drive", desc: "TCS is conducting on-campus hiring for 2024 batch. All eligible students must register.", date: "Mar 15, 2024", type: "Placement" },
  { title: "Resume Workshop", desc: "Mandatory resume building workshop this Friday at 3 PM in Seminar Hall.", date: "Mar 12, 2024", type: "Event" },
  { title: "Internship Deadline", desc: "Last date to submit internship completion certificates is March 30.", date: "Mar 10, 2024", type: "Deadline" },
];

const typeColors = {
  Placement: "gradient-success",
  Event: "gradient-info",
  Deadline: "gradient-warning",
};

export default function Admin() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notifyTarget, setNotifyTarget] = useState("all");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage notifications & exports</p>
        </div>
        <button className="btn-glow px-5 py-2.5 rounded-xl text-sm text-primary-foreground font-semibold flex items-center gap-2 animate-pulse-glow">
          <FileSpreadsheet className="w-4 h-4" /> Export to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Notifications */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Smart Notifications</h3>
          </div>
          <div className="space-y-3 mb-4">
            <label className="text-xs text-muted-foreground font-medium">Send to</label>
            <div className="flex gap-2">
              {["all", "placed", "CSE", "IT", "ECE"].map((t) => (
                <button
                  key={t}
                  onClick={() => setNotifyTarget(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    notifyTarget === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "all" ? "All Students" : t === "placed" ? "Placed" : t}
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Write notification message..."
            className="w-full h-24 bg-muted/50 border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <button className="mt-3 btn-glow px-4 py-2 rounded-xl text-sm text-primary-foreground font-medium flex items-center gap-2">
            <Send className="w-4 h-4" /> Send Notification
          </button>
        </div>

        {/* Announcement Panel */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Publish Announcement</h3>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Announcement title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-24 bg-muted/50 border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button className="btn-glow px-4 py-2 rounded-xl text-sm text-primary-foreground font-medium flex items-center gap-2">
              <Megaphone className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Announcements Feed</h3>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${typeColors[a.type]}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{a.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full text-primary-foreground font-medium ${typeColors[a.type]}`}>{a.type}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{a.desc}</p>
                <p className="text-[10px] text-muted-foreground">{a.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
