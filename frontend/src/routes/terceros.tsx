import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { terceros } from "@/lib/demo-data";
import { ShieldCheck, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/terceros")({
  head: () => ({
    meta: [
      { title: "Autorización de terceros — CasaGrande" },
      { name: "description", content: "Aprueba o rechaza entregas a terceros registradas en campo." },
    ],
  }),
  component: TercerosPage,
});

function TercerosPage() {
  const pendientes = terceros.filter((t) => t.estado === "pendiente");
  const historial = terceros.filter((t) => t.estado !== "pendiente");

  return (
    <AppLayout
      title="Autorización de entregas a terceros"
      subtitle="Revisa las solicitudes registradas por los jefes de anexo"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatMini icon={<Clock className="h-4 w-4" />} label="Pendientes" value={pendientes.length} tone="warning" />
        <StatMini icon={<Check className="h-4 w-4" />} label="Aprobadas hoy" value={1} tone="success" />
        <StatMini icon={<X className="h-4 w-4" />} label="Rechazadas hoy" value={1} tone="destructive" />
      </div>

      <Card className="p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Bandeja de pendientes</h3>
        </div>
        <div className="space-y-3">
          {pendientes.map((t) => (
            <div key={t.id} className="rounded-lg border border-border p-4 bg-muted/20">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[240px]">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                    {t.evento} · {t.zona}
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] text-muted-foreground">Titular</div>
                      <div className="font-semibold text-sm">{t.titular}</div>
                      <div className="text-xs font-mono text-muted-foreground">DNI {t.dniTitular}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground">Persona autorizada</div>
                      <div className="font-semibold text-sm">{t.autorizado}</div>
                      <div className="text-xs font-mono text-muted-foreground">DNI {t.dniAutorizado}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-3">Solicitado: {t.fecha}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.error("Solicitud rechazada")}>
                    <X className="h-3.5 w-3.5" /> Rechazar
                  </Button>
                  <Button size="sm" className="gap-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => toast.success("Entrega autorizada")}>
                    <Check className="h-3.5 w-3.5" /> Aprobar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Historial reciente</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 font-semibold">Evento</th>
                <th className="pb-3 font-semibold">Titular</th>
                <th className="pb-3 font-semibold">Autorizado</th>
                <th className="pb-3 font-semibold">Zona</th>
                <th className="pb-3 font-semibold">Fecha</th>
                <th className="pb-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="py-3">{t.evento}</td>
                  <td className="py-3 font-medium">{t.titular}</td>
                  <td className="py-3">{t.autorizado}</td>
                  <td className="py-3 text-muted-foreground">{t.zona}</td>
                  <td className="py-3 text-muted-foreground text-xs">{t.fecha}</td>
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className={
                        t.estado === "aprobada"
                          ? "bg-success/15 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {t.estado === "aprobada" ? "Aprobada" : "Rechazada"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}

function StatMini({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "warning" | "success" | "destructive" }) {
  const map = {
    warning: "bg-warning/20 text-warning-foreground",
    success: "bg-success/15 text-success",
    destructive: "bg-destructive/10 text-destructive",
  }[tone];
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${map}`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold font-display tabular-nums">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}
