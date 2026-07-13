import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useZonas } from "@/lib/zonas-store";
import { NewZonaDialog } from "@/components/new-zona-dialog";
import { MapPin, Plus, Edit3, Power } from "lucide-react";


export const Route = createFileRoute("/zonas")({
  head: () => ({
    meta: [
      { title: "Zonas / Anexos — CasaGrande" },
      { name: "description", content: "Catálogo de zonas y anexos con jefes asignados." },
    ],
  }),
  component: ZonasPage,
});

function ZonasPage() {
  const zonas = useZonas();
  return (
    <AppLayout
      title="Zonas / Anexos"
      subtitle="Catálogo de zonas operativas y jefes asignados"
      actions={
        <NewZonaDialog
          trigger={
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Nueva zona
            </Button>
          }
        />
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {zonas.map((z) => (
          <Card key={z.id} className={`p-5 relative overflow-hidden ${!z.activa ? "opacity-70" : ""}`}>
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-secondary/10 -translate-y-8 translate-x-8" />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <Badge
                  variant="outline"
                  className={
                    z.activa
                      ? "bg-success/15 text-success border-success/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {z.activa ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg font-display">{z.nombre}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {z.jefes} {z.jefes === 1 ? "jefe asignado" : "jefes asignados"}
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Edit3 className="h-3.5 w-3.5" /> Editar
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Power className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
