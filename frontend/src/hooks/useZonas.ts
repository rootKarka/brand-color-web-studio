import { useQuery } from "@tanstack/react-query";
import { zonaService } from "@/services/zonaService";

export function useZonas() {
  return useQuery({
    queryKey: ["zonas"],
    queryFn: zonaService.getAll,
  });
}