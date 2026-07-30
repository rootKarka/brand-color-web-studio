import api from "@/lib/api";

import type { ApiResponse } from "@/types/api";

import type {
  ActualizarJefeRequest,
  CrearJefeRequest,
  CrearJefeResponse,
  Jefe,
} from "@/types/jefe";


async function listar(): Promise<ApiResponse<Jefe[]>> {
  const response = await api.get<ApiResponse<Jefe[]>>(
    "/usuarios/jefes/",
  );

  return response.data;
}


async function obtener(
  id: number,
): Promise<ApiResponse<Jefe>> {

  const response = await api.get<ApiResponse<Jefe>>(
    `/usuarios/jefes/${id}/`,
  );

  return response.data;
}


async function crear(
  data: CrearJefeRequest,
): Promise<ApiResponse<CrearJefeResponse>> {

  const response = await api.post<ApiResponse<CrearJefeResponse>>(
    "/usuarios/jefes/",
    data,
  );

  return response.data;
}


async function actualizar(
  id: number,
  data: ActualizarJefeRequest,
): Promise<ApiResponse<Jefe>> {

  const response = await api.patch<ApiResponse<Jefe>>(
    `/usuarios/jefes/${id}/`,
    data,
  );

  return response.data;
}


export const jefeService = {
  listar,
  obtener,
  crear,
  actualizar,
};