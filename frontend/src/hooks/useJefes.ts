import { useQuery } from "@tanstack/react-query";

import { jefeService } from "@/services/jefeService";

export function useJefes() {
  return useQuery({
    queryKey: ["jefes"],
    queryFn: jefeService.listar,
  });
}