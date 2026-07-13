import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { eventos } from "@/lib/demo-data";
import { CalendarPlus, Search, Upload, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — CasaGrande" },
      { name: "description", content: "Gestión de eventos y entregables: crea, activa y cierra periodos de entrega." },
    ],
  }),
  component: EventosPage,
});

function EventosPage() {
  return (
    <AppLayout
      title="Eventos / Entregables"
      subtitle="Crea, activa y cierra periodos de entrega de beneficios"
      actions={
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <CalendarPlus className="h-4 w-4" /> Nuevo evento
        </Button>
      }
    >
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar evento..." className="pl-9" />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Todos los estados</option>
          <option>Activos</option>
          <option>Cerrados</option>
          <option>Borradores</option>
        </select>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {eventos.map((e) => {
          const pct = e.beneficiarios ? Math.round((e.entregados / e.beneficiarios) * 100) : 0;
          return (
            <Card key={e.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <EstadoBadge estado={e.estado} />
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-semibold text-base leading-tight">{e.nombre}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {e.inicio} — {e.fin}
              </p>

              {e.beneficiarios > 0 ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Avance</span>
                    <span className="font-semibold tabular-nums">
                      {e.entregados}/{e.beneficiarios} · {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-md bg-muted/50 border border-dashed border-border text-center">
                  <Upload className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Sin beneficiarios cargados</p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">Ver</Button>
                {e.estado === "activo" && (
                  <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Cerrar
                  </Button>
                )}
                {e.estado === "borrador" && (
                  <Button size="sm" className="flex-1 gap-1.5">
                    <Upload className="h-3.5 w-3.5" /> Subir Excel
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}

function EstadoBadge({ estado }: { estado: "activo" | "cerrado" | "borrador" }) {
  const map = {
    activo: "bg-success/15 text-success border-success/20",
    cerrado: "bg-muted text-muted-foreground border-border",
    borrador: "bg-warning/20 text-warning-foreground border-warning/30",
  };
  const label = { activo: "Activo", cerrado: "Cerrado", borrador: "Borrador" }[estado];
  return (
    <Badge variant="outline" className={`${map[estado]} text-[10px] font-semibold uppercase tracking-wide`}>
      {label}
    </Badge>
  );
}
