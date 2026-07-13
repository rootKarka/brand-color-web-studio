import { useSyncExternalStore } from "react";
import { zonas as seed, type Zona } from "./demo-data";

let state: Zona[] = [...seed];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const zonasStore = {
  getAll: () => state,
  add: (nombre: string) => {
    const nueva: Zona = { id: `z${Date.now()}`, nombre, activa: true, jefes: 0 };
    state = [...state, nueva];
    emit();
    return nueva;
  },
  toggle: (id: string) => {
    state = state.map((z) => (z.id === id ? { ...z, activa: !z.activa } : z));
    emit();
  },
  existsNombre: (nombre: string) =>
    state.some((z) => z.nombre.toLowerCase() === nombre.toLowerCase()),
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useZonas(): Zona[] {
  return useSyncExternalStore(zonasStore.subscribe, zonasStore.getAll, zonasStore.getAll);
}
