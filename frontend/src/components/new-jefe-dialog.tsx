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

import { useZonas } from "@/hooks/useZonas";
import { useCrearJefe } from "@/hooks/useCrearJefe";

type Props = {
  trigger: ReactNode;
};

export function NewJefeDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);

  const crearJefe = useCrearJefe();

  const { data: zonas = [] } = useZonas();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [zonaId, setZonaId] = useState<number | "">("");
  const [estado, setEstado] = useState<"activo" | "inactivo">("activo");

  function reset() {
    setFirstName("");
    setLastName("");
    setTelefono("");
    setDni("");
    setZonaId("");
    setEstado("activo");
}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nombres = firstName.trim();
    const apellidos = lastName.trim();

    if (!nombres) {
      return toast.error("Los nombres son obligatorios");
    }

    if (!apellidos) {
      return toast.error("Los apellidos son obligatorios");
    }

    if (!/^\d{8}$/.test(dni)) {
      return toast.error("El DNI debe tener 8 dígitos");
    }

    if (!zonaId) {
      return toast.error("Seleccione una zona");
    }

    crearJefe.mutate(
      {
        first_name: nombres,
        last_name: apellidos,
        dni,
        telefono,
        zonas: [zonaId],
        is_active: estado === "activo",
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nuevo jefe de anexo</DialogTitle>

            <DialogDescription>
              Se generará una contraseña temporal para el acceso a la aplicación móvil.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-2 gap-3">

              <div className="grid gap-2">
                <Label htmlFor="firstName">
                  Nombres
                </Label>

                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Juan Carlos"
                  autoFocus
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">
                  Apellidos
                </Label>

                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Pérez Díaz"
                />
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="grid gap-2">
                <Label htmlFor="dni">
                  DNI
                </Label>

                <Input
                  id="dni"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="75321458"
                  value={dni}
                  onChange={(e) =>
                    setDni(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 8)
                    )
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefono">
                  Teléfono
                </Label>

                <Input
                  id="telefono"
                  inputMode="numeric"
                  placeholder="987654321"
                  value={telefono}
                  onChange={(e) =>
                    setTelefono(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9)
                    )
                  }
                />
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="grid gap-2">
                <Label htmlFor="zona">
                  Zona asignada
                </Label>

                <select
                  id="zona"
                  value={zonaId}
                  onChange={(e) =>
                    setZonaId(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Seleccione una zona</option>

                  {zonas.map((zona) => (
                    <option
                      key={zona.id}
                      value={zona.id}
                    >
                      {zona.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estado">
                  Estado
                </Label>

                <select
                  id="estado"
                  value={estado}
                  onChange={(e) =>
                    setEstado(
                      e.target.value as "activo" | "inactivo"
                    )
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="activo">
                    Activo
                  </option>

                  <option value="inactivo">
                    Inactivo
                  </option>
                </select>
              </div>

            </div>

          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={crearJefe.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {crearJefe.isPending
                ? "Creando..."
                : "Crear jefe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}