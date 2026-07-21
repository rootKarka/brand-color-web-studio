import { useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import { zonaService } from "@/services/zonaService";

export function NewZonaDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");

  const queryClient = useQueryClient();

  const createZonaMutation = useMutation({
    mutationFn: zonaService.create,

    onSuccess: (nuevaZona) => {
      toast.success("Zona creada", {
        description: `${nuevaZona.nombre} creada correctamente.`,
      });

      // Vuelve a consultar las zonas automáticamente
      queryClient.invalidateQueries({
        queryKey: ["zonas"],
      });

      setNombre("");
      setOpen(false);
    },

    onError: (error: any) => {
      if (error.response?.status === 400) {
        toast.error("Ya existe una zona con ese nombre");
      } else {
        toast.error("Error al crear la zona");
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const n = nombre.trim();

    if (!n) {
      toast.error("El nombre de la zona es obligatorio");
      return;
    }

    createZonaMutation.mutate(n);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva zona</DialogTitle>

            <DialogDescription>
              Registra una nueva zona operativa. Luego podrás asignar jefes de
              anexo.
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createZonaMutation.isPending}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={createZonaMutation.isPending}
            >
              {createZonaMutation.isPending ? "Creando..." : "Crear zona"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}