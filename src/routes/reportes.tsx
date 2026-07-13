import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Package, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes — CasaGrande" },
      { name: "description", content: "Exporta reportes de entregas, pendientes y autorizaciones a Excel." },
    ],
  }),
  component: ReportesPage,
});

const reportes = [
  { icon: Package, title: "Entregas realizadas", desc: "Detalle de entregas confirmadas por evento y zona.", tone: "primary" as const },
  { icon: Users, title: "Beneficiarios pendientes", desc: "Listado de trabajadores que aún no han recogido su beneficio.", tone: "warning" as const },
  { icon: ShieldCheck, title: "Entregas a terceros", desc: "Historial de solicitudes con estado de autorización.", tone: "success" as const },
  { icon: FileSpreadsheet, title: "Consolidado por evento", desc: "Resumen ejecutivo con avance total y por zona.", tone: "neutral" as const },
];

function ReportesPage() {
  return (
    <AppLayout
      title="Reportes"
      subtitle="Descarga en formato Excel (.xlsx) con filtros por evento, zona y fechas"
    >
      <Card className="p-5 mb-6">
        <h3 className="font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>Todos los eventos</option>
            <option>Azúcar — Marzo 2026</option>
            <option>Canasta — Junio 2026</option>
          </select>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>Todas las zonas</option>
            <option>Casa Grande</option>
            <option>Churín</option>
          </select>
          <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
          <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportes.map((r) => {
          const Icon = r.icon;
          const toneMap = {
            primary: "bg-primary/10 text-primary",
            success: "bg-success/15 text-success",
            warning: "bg-warning/20 text-warning-foreground",
            neutral: "bg-muted text-foreground",
          };
          return (
            <Card key={r.title} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 ${toneMap[r.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{r.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                  <Button
                    size="sm"
                    className="mt-4 gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => toast.success(`Generando: ${r.title}`)}
                  >
                    <Download className="h-3.5 w-3.5" /> Exportar Excel
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
