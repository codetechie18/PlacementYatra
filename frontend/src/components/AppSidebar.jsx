import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Award,
  BarChart3,
  Settings,
  Rocket,
  Moon,
  Sun,
  ChevronLeft,
  User,
  FileText,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRole } from "../contexts/RoleContext"; // ✅ correct import

// ✅ Admin Menu
const adminMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Internships", url: "/internships", icon: Briefcase },
  { title: "Placements", url: "/placements", icon: Award },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Admin Panel", url: "/admin", icon: Settings },
];

// ✅ Student Menu
const studentMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Profile", url: "/students/me", icon: User },
  { title: "Applications", url: "/applications", icon: FileText },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Internships", url: "/internships", icon: Briefcase },
];

export default function AppSidebar() {
  const location = useLocation();

  // ✅ Proper role usage
  const { user, isAdmin, logout } = useRole();

  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // ✅ Correct menu selection
  const menuItems = isAdmin ? adminMenu : studentMenu;

  return (
    <aside
      className={`${
        collapsed ? "w-[70px]" : "w-[260px]"
      } h-screen sticky top-0 flex flex-col border-r bg-card/50 backdrop-blur-xl transition-all duration-300 z-50`}
    >
      {/* 🔥 Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Rocket className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-gradient">
            PlacementAI
          </span>
        )}
      </div>

      {/* 👤 User Info */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <span className="text-xs opacity-60 capitalize">
            {user.role}
          </span>
        </div>
      )}

      {/* 📌 Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.url;
          return (
            <Link
              key={item.title}
              to={item.url}
              className={`sidebar-item ${active ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* ⚙️ Bottom Controls */}
      <div className="px-3 py-4 border-t space-y-2">
        {/* 🌙 Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          className="sidebar-item w-full"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* 📏 Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* 🚪 Logout */}
        {user && (
          <button
            onClick={logout}
            className="sidebar-item w-full text-red-500"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </aside>
  );
}