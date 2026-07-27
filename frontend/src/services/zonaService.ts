import api from "@/lib/api";

export interface Zona {
    id: number;
    nombre: string;
    is_active: boolean;
}

export const zonaService = {
    async getAll(): Promise<Zona[]> {
        const { data } = await api.get("/zonas/");
        
        // Si data ya es un arreglo, lo devuelve.
        // Si no, busca 'results' o 'data' interno. Si no existe ninguno, devuelve []
        if (Array.isArray(data)) return data;
        return data.results ?? data.data ?? [];
    },

    async create(nombre: string): Promise<Zona> {
        const { data } = await api.post("/zonas/", {
            nombre,
        });

        return data.data ?? data;
    },
};