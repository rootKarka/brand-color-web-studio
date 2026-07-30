export interface Zona {
  id: number;
  nombre: string;
}

export interface Jefe {
  id: number;
  nombre_completo: string;
  dni: string;
  telefono: string;
  zonas: Zona[];
  is_active: boolean;
  last_login: string | null;
  username: string;
  email: string;
  date_joined: string;
}

export interface CrearJefeRequest {
  first_name: string;
  last_name: string;
  dni: string;
  telefono: string;
  zonas: number[];
  is_active: boolean;
}

export type ActualizarJefeRequest = Partial<CrearJefeRequest>;

export interface CrearJefeResponse {
  password_temporal: string;
  usuario: Jefe;
}
