import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jefesStore, zonasActivas } from "@/lib/jefes-store";

type Props = { trigger: ReactNode };

export function NewJefeDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const zonas = zonasActivas();
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [zona, setZona] = useState(zonas[0] ?? "");
  const [estado, setEstado] = useState<"activo" | "inactivo">("activo");

  function reset() {
    setNombre("");
    setDni("");
    setZona(zonas[0] ?? "");
    setEstado("activo");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nombreOk = nombre.trim();
    if (!nombreOk) return toast.error("El nombre es obligatorio");
    if (!/^\d{8}$/.test(dni)) return toast.error("El DNI debe tener 8 dígitos");
    if (jefesStore.existsDni(dni)) return toast.error("Ya existe un jefe con ese DNI");
    if (!zona) return toast.error("Selecciona una zona");

    const nuevo = jefesStore.add({ nombre: nombreOk, dni, zona, estado });
    toast.success("Jefe creado", {
      description: `${nuevo.nombre} — ${nuevo.zona}. Contraseña temporal enviada.`,
    });
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nuevo jefe de anexo</DialogTitle>
            <DialogDescription>
              Se generará una contraseña temporal para el acceso a la app móvil.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                placeholder="Ej. Juan Pérez Vargas"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="8 dígitos"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zona">Zona asignada</Label>
                <select
                  id="zona"
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {zonas.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value as "activo" | "inactivo")}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Crear jefe
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
