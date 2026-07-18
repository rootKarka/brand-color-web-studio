import { api } from "./api";

export async function obtenerZonas() {
  const { data } = await api.get("/zonas/");
  return data;
}