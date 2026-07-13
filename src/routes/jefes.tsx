import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { jefes } from "@/lib/demo-data";
import { UserPlus, Search, KeyRound, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/jefes")({
  head: () => ({
    meta: [
      { title: "Jefes de anexo — CasaGrande" },
      { name: "description", content: "Gestión de usuarios jefes de anexo: crear, editar, activar y resetear contraseñas." },
    ],
  }),
  component: JefesPage,
});

function JefesPage() {
  return (
    <AppLayout
      title="Jefes de anexo"
      subtitle="Cuentas de la app móvil, contraseñas y zona asignada"
      actions={
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4" /> Nuevo jefe
        </Button>
      }
    >
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre, DNI o zona..." className="pl-9" />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Todas las zonas</option>
          <option>Casa Grande</option>
          <option>Churín</option>
          <option>Cartavio</option>
          <option>Paramonga</option>
        </select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Jefe</th>
                <th className="px-4 py-3 font-semibold">DNI</th>
                <th className="px-4 py-3 font-semibold">Zona</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Último ingreso</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jefes.map((j) => (
                <tr key={j.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {j.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{j.nombre}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{j.dni}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {j.zona}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          j.estado === "activo" ? "bg-success" : "bg-muted-foreground"
                        }`}
                      />
                      <span className="capitalize">{j.estado}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{j.ultimoIngreso}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        <KeyRound className="h-3.5 w-3.5" /> Resetear
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
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
