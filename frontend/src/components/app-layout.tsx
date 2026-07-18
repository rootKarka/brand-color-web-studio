import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  LayoutDashboard,
  CalendarRange,
  Users,
  MapPin,
  UserCog,
  ShieldCheck,
  FileSpreadsheet,
  History,
  LogOut,
  Bell,
} from "lucide-react";
import { brandLogo } from "@/lib/demo-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/eventos", label: "Eventos", icon: CalendarRange },
  { to: "/beneficiarios", label: "Beneficiarios", icon: Users },
  { to: "/terceros", label: "Autorización terceros", icon: ShieldCheck, badge: 2 },
  { to: "/jefes", label: "Jefes de anexo", icon: UserCog },
  { to: "/zonas", label: "Zonas / Anexos", icon: MapPin },
  { to: "/reportes", label: "Reportes", icon: FileSpreadsheet },
  { to: "/auditoria", label: "Auditoría", icon: History },
];

export function AppLayout({ children, title, subtitle, actions }: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const { location } = useRouterState();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-sm">
              <img src={brandLogo} alt="CasaGrande" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-sm leading-tight">CasaGrande</div>
              <div className="text-[11px] text-sidebar-foreground/60 leading-tight">Gestión de entregas</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <Badge className="h-5 min-w-5 rounded-full bg-secondary text-secondary-foreground border-0 px-1.5 text-[10px]">
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
            <Avatar className="h-9 w-9 border border-sidebar-border">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Admin CG</div>
              <div className="text-[11px] text-sidebar-foreground/60 truncate">admin@casagrande.pe</div>
            </div>
            <LogOut className="h-4 w-4 text-sidebar-foreground/60" />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-5">
            <div className="min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground truncate">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {actions}
              <button className="relative h-10 w-10 rounded-lg border border-border hover:bg-muted flex items-center justify-center">
                <Bell className="h-[18px] w-[18px] text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-secondary" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
