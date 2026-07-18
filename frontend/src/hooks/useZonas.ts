import { useEffect, useState } from "react";

import { getZonas } from "@/services/zonas";

export function useZonas() {

    const [zonas, setZonas] = useState([]);

    const cargar = async () => {
        const data = await getZonas();
        setZonas(data);
    };

    useEffect(() => {
        cargar();
    }, []);

    return {
        zonas,
        cargar,
    };
}