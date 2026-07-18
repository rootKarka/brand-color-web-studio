import { useSyncExternalStore } from "react";
import { eventos as seed, type Evento } from "./demo-data";

let state: Evento[] = [...seed];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const eventsStore = {
  getAll: () => state,
  add: (e: Omit<Evento, "id" | "entregados">) => {
    const nuevo: Evento = {
      ...e,
      id: `e${Date.now()}`,
      entregados: 0,
    };
    state = [nuevo, ...state];
    emit();
    return nuevo;
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useEventos(): Evento[] {
  return useSyncExternalStore(
    eventsStore.subscribe,
    eventsStore.getAll,
    eventsStore.getAll,
  );
}
