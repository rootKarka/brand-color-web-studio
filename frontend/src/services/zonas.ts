import { api } from "@/lib/api";

export async function getZonas() {
    const response = await api.get("/zonas/");
    return response.data;
}