import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { jefeService } from "@/services/jefeService";

export function useCrearJefe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jefeService.crear,

    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["jefes"],
      });

      toast.success(response.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "No fue posible crear el jefe.";

      toast.error(message);
    },
  });
}