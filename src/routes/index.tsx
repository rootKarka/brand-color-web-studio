import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { avancePorZona, eventos, terceros } from "@/lib/demo-data";
import { TrendingUp, Package, Users, AlertCircle, ArrowRight, CalendarPlus, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CasaGrande" },
      { name: "description", content: "Panel de indicadores con avance de entregas por evento y zona." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const activos = eventos.filter((e) => e.estado === "activo");
  const totalBenef = activos.reduce((a, e) => a + e.beneficiarios, 0);
  const totalEntreg = activos.reduce((a, e) => a + e.entregados, 0);
  const pendAutorizacion = terceros.filter((t) => t.estado === "pendiente").length;
  const avanceGlobal = Math.round((totalEntreg / totalBenef) * 100);

  return (
    <AppLayout
      title="Panel de control"
      subtitle="Resumen de entregas en curso y actividad operativa"
      actions={
        <>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <CalendarPlus className="h-4 w-4" /> Nuevo evento
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Eventos activos"
          value={activos.length.toString()}
          hint={`${eventos.filter((e) => e.estado === "cerrado").length} cerrados este año`}
          icon={<Package className="h-5 w-5" />}
          tone="primary"
        />
        <StatCard
          label="Beneficiarios totales"
          value={totalBenef.toLocaleString()}
          hint="En eventos activos"
          icon={<Users className="h-5 w-5" />}
          tone="neutral"
        />
        <StatCard
          label="Avance global"
          value={`${avanceGlobal}%`}
          hint={`${totalEntreg.toLocaleString()} entregados`}
          icon={<TrendingUp className="h-5 w-5" />}
          tone="success"
          progress={avanceGlobal}
        />
        <StatCard
          label="Terceros pendientes"
          value={pendAutorizacion.toString()}
          hint="Requieren tu autorización"
          icon={<AlertCircle className="h-5 w-5" />}
          tone="warning"
          href="/terceros"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-base">Eventos en curso</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Avance por evento activo</p>
            </div>
            <Link to="/eventos" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-5">
            {activos.map((e) => {
              const pct = Math.round((e.entregados / e.beneficiarios) * 100);
              return (
                <div key={e.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{e.nombre}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {e.inicio} — {e.fin}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm tabular-nums">
                        {e.entregados}/{e.beneficiarios}
                      </div>
                      <div className="text-xs text-muted-foreground">{pct}%</div>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-5">
            <h3 className="font-semibold text-base">Avance por zona</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Azúcar — Marzo 2026</p>
          </div>
          <div className="space-y-4">
            {avancePorZona.map((z) => (
              <div key={z.zona}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="font-medium">{z.zona}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {z.entregados}/{z.total}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={z.porcentaje} className="h-2 flex-1" />
                  <Badge
                    variant="outline"
                    className={`text-xs tabular-nums font-semibold border-0 ${
                      z.porcentaje >= 75
                        ? "bg-success/15 text-success"
                        : z.porcentaje >= 60
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/20 text-warning-foreground"
                    }`}
                  >
                    {z.porcentaje}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-base">Solicitudes pendientes de autorización</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Entregas a terceros registradas en campo</p>
          </div>
          <Link to="/terceros" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
            Ir a bandeja <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {terceros.filter((t) => t.estado === "pendiente").map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-muted/30">
              <div className="h-10 w-10 rounded-lg bg-warning/20 text-warning-foreground flex items-center justify-center shrink-0">
                <ShieldIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {t.titular} <span className="text-muted-foreground font-normal">→</span> {t.autorizado}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.evento} · {t.zona} · {t.fecha}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="outline">Rechazar</Button>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Aprobar</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppLayout>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StatCard({
  label, value, hint, icon, tone, progress, href,
}: {
  label: string; value: string; hint: string; icon: React.ReactNode;
  tone: "primary" | "success" | "warning" | "neutral"; progress?: number; href?: string;
}) {
  const toneStyles = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    neutral: "bg-muted text-foreground",
  }[tone];

  const inner = (
    <Card className="p-5 hover:shadow-md transition-shadow h-full">
      <div className="flex items-start justify-between mb-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${toneStyles}`}>{icon}</div>
        {href && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="text-2xl font-bold font-display tabular-nums">{value}</div>
      <div className="text-sm font-medium mt-0.5">{label}</div>
      <div className="text-xs text-muted-foreground mt-1">{hint}</div>
      {progress !== undefined && <Progress value={progress} className="h-1.5 mt-3" />}
    </Card>
  );
  return href ? <Link to={href}>{inner}</Link> : inner;
}
