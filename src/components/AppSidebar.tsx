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
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, role: "user" as const },
  { label: "Verify", path: "/verify", icon: Upload, role: "user" as const },
  { label: "History", path: "/history", icon: History, role: "user" as const },
  { label: "Analytics", path: "/analytics", icon: BarChart3, role: "user" as const },
  { label: "Admin Panel", path: "/admin", icon: ShieldCheck, role: "admin" as const },
  { label: "User Management", path: "/admin/users", icon: Users, role: "admin" as const },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredNav = navItems.filter(
    (item) => item.role === "user" || user?.role === "admin"
  );

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <Link
        to="/dashboard"
        className={cn(
          "flex items-center border-b border-sidebar-border px-3 py-5 transition-colors hover:bg-sidebar-accent/50",
          collapsed ? "justify-center" : "gap-3 px-6"
        )}
      >
        <Shield className="h-7 w-7 shrink-0" />
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="font-heading text-base font-bold leading-tight">HWV System</h1>
            <p className="text-xs opacity-70 font-ui">Deep Learning</p>
          </div>
        )}
      </Link>

      {/* Toggle button */}
      <div className={cn("flex px-3 pt-3", collapsed ? "justify-center" : "justify-end pr-4")}>
        <button
          onClick={onToggle}
          className="rounded p-1.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {filteredNav.map((item) => {
          const active = location.pathname === item.path;
          const linkContent = (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded px-3 py-2.5 text-sm font-ui transition-colors",
                collapsed ? "justify-center" : "gap-3",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && item.label}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-ui">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="mb-3 px-2">
            <p className="text-sm font-medium font-ui">{user?.name}</p>
            <p className="text-xs opacity-60 font-ui">{user?.email}</p>
          </div>
        )}
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center rounded px-3 py-2 text-sm font-ui text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-ui">Sign Out</TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-ui text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
