import { useSyncExternalStore } from "react";
import { jefes as seed, zonas, type Jefe } from "./demo-data";

let state: Jefe[] = [...seed];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const jefesStore = {
  getAll: () => state,
  add: (j: Omit<Jefe, "id" | "ultimoIngreso">) => {
    const nuevo: Jefe = { ...j, id: `j${Date.now()}`, ultimoIngreso: "—" };
    state = [nuevo, ...state];
    emit();
    return nuevo;
  },
  existsDni: (dni: string) => state.some((j) => j.dni === dni),
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useJefes(): Jefe[] {
  return useSyncExternalStore(jefesStore.subscribe, jefesStore.getAll, jefesStore.getAll);
}

export const zonasActivas = () => zonas.filter((z) => z.activa).map((z) => z.nombre);
