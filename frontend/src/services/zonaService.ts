import api from "@/lib/api";

export interface Zona {
    id: number;
    nombre: string;
    is_active: boolean;
}

export const zonaService = {

    async getAll(): Promise<Zona[]> {
        const { data } = await api.get("/zonas/");
        return data;
    },

    async create(nombre: string): Promise<Zona> {
        const { data } = await api.post("/zonas/", {
            nombre,
        });

        return data;
    },

};