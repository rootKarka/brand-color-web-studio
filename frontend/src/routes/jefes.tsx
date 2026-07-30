import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NewJefeDialog } from "@/components/new-jefe-dialog";
import { useJefes } from "@/hooks/useJefes";
import {
  UserPlus,
  Search,
  KeyRound,
  MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/jefes")({
  head: () => ({
    meta: [
      {
        title: "Jefes de anexo — CasaGrande",
      },
      {
        name: "description",
        content:
          "Gestión de usuarios jefes de anexo.",
      },
    ],
  }),
  component: JefesPage,
});

function JefesPage() {
  const {
    data,
    isLoading,
    error,
  } = useJefes();

  const jefes = data?.data ?? [];

  if (isLoading) {
    return (
      <AppLayout
        title="Jefes de anexo"
        subtitle="Cuentas de la app móvil"
      >
        <Card className="p-6">
          Cargando jefes...
        </Card>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout
        title="Jefes de anexo"
        subtitle="Cuentas de la app móvil"
      >
        <Card className="p-6 text-red-500">
          Error al cargar los jefes.
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Jefes de anexo"
      subtitle="Cuentas de la app móvil, contraseñas y zona asignada"
      actions={
        <NewJefeDialog
          trigger={
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              Nuevo jefe
            </Button>
          }
        />
      }
    >
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Buscar por nombre, DNI o zona..."
            className="pl-9"
          />
        </div>

        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Todas las zonas</option>
        </select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">
                  Jefe
                </th>

                <th className="px-4 py-3 font-semibold">
                  DNI
                </th>

                <th className="px-4 py-3 font-semibold">
                  Zona(s)
                </th>

                <th className="px-4 py-3 font-semibold">
                  Estado
                </th>

                <th className="px-4 py-3 font-semibold">
                  Último ingreso
                </th>

                <th className="px-4 py-3 font-semibold text-right">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {jefes.map((j) => (
                <tr
                  key={j.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {j.nombre_completo
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="font-medium">
                        {j.nombre_completo}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-mono text-xs">
                    {j.dni}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {j.zonas.map((zona) => (
                        <Badge
                          key={zona.id}
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20"
                        >
                          {zona.nombre}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          j.is_active
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      <span>
                        {j.is_active
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {j.last_login
                      ? new Date(
                          j.last_login
                        ).toLocaleString("es-PE")
                      : "Nunca"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs"
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                        Resetear
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {jefes.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No hay jefes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}