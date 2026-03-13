import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Upload,
  History,
  BarChart3,
  Users,
  ShieldCheck,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, role: "user" as const },
  { label: "Verify", path: "/verify", icon: Upload, role: "user" as const },
  { label: "History", path: "/history", icon: History, role: "user" as const },
  { label: "Analytics", path: "/analytics", icon: BarChart3, role: "user" as const },
  { label: "Admin Panel", path: "/admin", icon: ShieldCheck, role: "admin" as const },
  { label: "User Management", path: "/admin/users", icon: Users, role: "admin" as const },
];

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredNav = navItems.filter(
    (item) => item.role === "user" || user?.role === "admin"
  );

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <Shield className="h-7 w-7" />
        <div>
          <h1 className="font-heading text-base font-bold leading-tight">HWV System</h1>
          <p className="text-xs opacity-70 font-ui">Deep Learning</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredNav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-ui transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium font-ui">{user?.name}</p>
          <p className="text-xs opacity-60 font-ui">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-ui text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
