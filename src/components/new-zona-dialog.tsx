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
import { zonasStore } from "@/lib/zonas-store";

export function NewZonaDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = nombre.trim();
    if (!n) return toast.error("El nombre de la zona es obligatorio");
    if (zonasStore.existsNombre(n)) return toast.error("Ya existe una zona con ese nombre");
    const nueva = zonasStore.add(n);
    toast.success("Zona creada", { description: `${nueva.nombre} activa y lista para asignar jefes.` });
    setNombre("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva zona</DialogTitle>
            <DialogDescription>
              Registra una nueva zona operativa. Luego podrás asignar jefes de anexo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Label htmlFor="nombre">Nombre de la zona</Label>
            <Input
              id="nombre"
              placeholder="Ej. Sintuco"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Crear zona
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
