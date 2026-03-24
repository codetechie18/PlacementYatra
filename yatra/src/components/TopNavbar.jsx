import { Search, Bell, User } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground hidden md:block">
          Welcome back, <span className="text-gradient">Admin</span> 👋
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="search-bar w-64 hidden md:flex">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
          />
          <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>

        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full gradient-primary" />
        </button>

        <button className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </header>
  );
}
