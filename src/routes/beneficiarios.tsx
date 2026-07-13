import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { beneficiariosMock } from "@/lib/demo-data";
import { Upload, Search, Download, FileSpreadsheet, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/beneficiarios")({
  head: () => ({
    meta: [
      { title: "Beneficiarios — CasaGrande" },
      { name: "description", content: "Carga y consulta la lista de beneficiarios elegibles por evento." },
    ],
  }),
  component: BeneficiariosPage,
});

function BeneficiariosPage() {
  return (
    <AppLayout
      title="Beneficiarios"
      subtitle="Carga masiva desde Excel y consulta por evento"
      actions={
        <>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Plantilla
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Upload className="h-4 w-4" /> Cargar Excel
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border-l-4 border-l-success">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <div className="text-2xl font-bold font-display">480</div>
              <div className="text-xs text-muted-foreground">Cargados correctamente</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning-foreground" />
            <div>
              <div className="text-2xl font-bold font-display">12</div>
              <div className="text-xs text-muted-foreground">Filas con error — <a className="text-primary underline">descargar</a></div>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold font-display">Azúcar Mar 2026</div>
              <div className="text-xs text-muted-foreground">Última carga · hoy 09:48</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por DNI o nombre..." className="pl-9" />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Azúcar — Marzo 2026</option>
          <option>Canasta — Junio 2026</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Todas las zonas</option>
          <option>Casa Grande</option>
          <option>Churín</option>
          <option>Cartavio</option>
        </select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">DNI</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Nombre</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Zona</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Estado</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Entrega</th>
              </tr>
            </thead>
            <tbody>
              {beneficiariosMock.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{b.dni}</td>
                  <td className="px-4 py-3 font-medium">{b.nombre}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.zona}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        b.estado === "entregado"
                          ? "bg-success/15 text-success border-success/20"
                          : "bg-warning/20 text-warning-foreground border-warning/30"
                      }
                    >
                      {b.estado === "entregado" ? "Entregado" : "Pendiente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">{b.fechaEntrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
