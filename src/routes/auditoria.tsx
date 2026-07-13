import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auditoria } from "@/lib/demo-data";
import { History, Search } from "lucide-react";

export const Route = createFileRoute("/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoría — CasaGrande" },
      { name: "description", content: "Registro de acciones administrativas con usuario, fecha y detalle." },
    ],
  }),
  component: AuditoriaPage,
});

function AuditoriaPage() {
  return (
    <AppLayout
      title="Registro de auditoría"
      subtitle="Trazabilidad de acciones administrativas relevantes"
    >
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por usuario, acción o detalle..." className="pl-9" />
        </div>
        <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Últimas acciones</h3>
        </div>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-4">
            {auditoria.map((a) => (
              <div key={a.id} className="flex gap-4 relative">
                <div className="h-4 w-4 rounded-full bg-secondary border-4 border-background z-10 mt-1 shrink-0" />
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-sm">
                      <span className="font-semibold">{a.usuario}</span>{" "}
                      <span className="text-muted-foreground">{a.accion.toLowerCase()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">{a.fecha}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{a.detalle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
