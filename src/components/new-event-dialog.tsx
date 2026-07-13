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
import { eventsStore } from "@/lib/events-store";

type Props = {
  trigger: ReactNode;
  onCreated?: (id: string) => void;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function NewEventDialog({ trigger, onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState(todayISO());
  const [fin, setFin] = useState(todayISO());
  const [estado, setEstado] = useState<"borrador" | "activo">("borrador");

  function reset() {
    setNombre("");
    setInicio(todayISO());
    setFin(todayISO());
    setEstado("borrador");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) {
      toast.error("El nombre del evento es obligatorio");
      return;
    }
    if (fin < inicio) {
      toast.error("La fecha de fin no puede ser anterior a la de inicio");
      return;
    }
    const nuevo = eventsStore.add({
      nombre: nombre.trim(),
      inicio: formatDate(inicio),
      fin: formatDate(fin),
      estado,
      beneficiarios: 0,
    });
    toast.success("Evento creado", {
      description: `${nuevo.nombre} — ${nuevo.inicio} a ${nuevo.fin}`,
    });
    reset();
    setOpen(false);
    onCreated?.(nuevo.id);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nuevo evento</DialogTitle>
            <DialogDescription>
              Crea un nuevo periodo de entrega. Luego podrás subir el Excel de beneficiarios.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del evento</Label>
              <Input
                id="nombre"
                placeholder="Ej. Canasta — Diciembre 2026"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="inicio">Fecha de inicio</Label>
                <Input
                  id="inicio"
                  type="date"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fin">Fecha de fin</Label>
                <Input
                  id="fin"
                  type="date"
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado inicial</Label>
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value as "borrador" | "activo")}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="borrador">Borrador (recomendado)</option>
                <option value="activo">Activo</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Los borradores requieren cargar el Excel de beneficiarios antes de activarse.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Crear evento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
