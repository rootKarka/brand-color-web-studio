import logo from "@/assets/casagrande-logo.png";

export const brandLogo = logo;

export type Zona = { id: string; nombre: string; activa: boolean; jefes: number };
export const zonas: Zona[] = [
  { id: "z1", nombre: "Casa Grande", activa: true, jefes: 3 },
  { id: "z2", nombre: "Churín", activa: true, jefes: 2 },
  { id: "z3", nombre: "Cartavio", activa: true, jefes: 2 },
  { id: "z4", nombre: "Paramonga", activa: true, jefes: 1 },
  { id: "z5", nombre: "Sintuco", activa: false, jefes: 0 },
];

export type Jefe = {
  id: string;
  nombre: string;
  dni: string;
  zona: string;
  estado: "activo" | "inactivo";
  ultimoIngreso: string;
};
export const jefes: Jefe[] = [
  { id: "j1", nombre: "Juan Pérez Vargas", dni: "45678912", zona: "Casa Grande", estado: "activo", ultimoIngreso: "Hoy, 09:12" },
  { id: "j2", nombre: "María Quispe Ríos", dni: "42311098", zona: "Churín", estado: "activo", ultimoIngreso: "Hoy, 08:45" },
  { id: "j3", nombre: "Carlos Mendoza León", dni: "47820134", zona: "Cartavio", estado: "activo", ultimoIngreso: "Ayer, 17:30" },
  { id: "j4", nombre: "Rosa Alvarado Cruz", dni: "43902187", zona: "Casa Grande", estado: "activo", ultimoIngreso: "Hoy, 10:02" },
  { id: "j5", nombre: "Luis Rojas Salinas", dni: "40183726", zona: "Paramonga", estado: "inactivo", ultimoIngreso: "hace 5 días" },
  { id: "j6", nombre: "Ana Torres Guzmán", dni: "44562891", zona: "Churín", estado: "activo", ultimoIngreso: "Hoy, 07:58" },
  { id: "j7", nombre: "Pedro Silva Ramos", dni: "46781203", zona: "Cartavio", estado: "activo", ultimoIngreso: "Hoy, 09:33" },
  { id: "j8", nombre: "Elena Vega Chávez", dni: "41029384", zona: "Casa Grande", estado: "activo", ultimoIngreso: "Hoy, 08:15" },
];

export type Evento = {
  id: string;
  nombre: string;
  inicio: string;
  fin: string;
  estado: "activo" | "cerrado" | "borrador";
  beneficiarios: number;
  entregados: number;
};
export const eventos: Evento[] = [
  { id: "e1", nombre: "Azúcar — Marzo 2026", inicio: "01/03/2026", fin: "31/03/2026", estado: "activo", beneficiarios: 450, entregados: 320 },
  { id: "e2", nombre: "Canasta — Junio 2026", inicio: "01/06/2026", fin: "30/06/2026", estado: "activo", beneficiarios: 612, entregados: 187 },
  { id: "e3", nombre: "Útiles escolares — Marzo 2026", inicio: "10/03/2026", fin: "20/03/2026", estado: "activo", beneficiarios: 280, entregados: 245 },
  { id: "e4", nombre: "Azúcar — Diciembre 2025", inicio: "01/12/2025", fin: "31/12/2025", estado: "cerrado", beneficiarios: 445, entregados: 441 },
  { id: "e5", nombre: "Panetón — Diciembre 2025", inicio: "15/12/2025", fin: "24/12/2025", estado: "cerrado", beneficiarios: 530, entregados: 528 },
  { id: "e6", nombre: "Canasta — Septiembre 2026", inicio: "01/09/2026", fin: "30/09/2026", estado: "borrador", beneficiarios: 0, entregados: 0 },
];

export const avancePorZona = [
  { zona: "Casa Grande", entregados: 178, total: 220, porcentaje: 81 },
  { zona: "Churín", entregados: 62, total: 110, porcentaje: 56 },
  { zona: "Cartavio", entregados: 58, total: 80, porcentaje: 73 },
  { zona: "Paramonga", entregados: 22, total: 40, porcentaje: 55 },
];

export type Tercero = {
  id: string;
  evento: string;
  titular: string;
  dniTitular: string;
  autorizado: string;
  dniAutorizado: string;
  zona: string;
  fecha: string;
  estado: "pendiente" | "aprobada" | "rechazada";
};
export const terceros: Tercero[] = [
  { id: "t1", evento: "Azúcar — Marzo 2026", titular: "Segundo Vílchez", dniTitular: "43871209", autorizado: "Isabel Vílchez", dniAutorizado: "76812340", zona: "Casa Grande", fecha: "Hoy, 10:14", estado: "pendiente" },
  { id: "t2", evento: "Canasta — Junio 2026", titular: "Mario Fernández", dniTitular: "41029876", autorizado: "Rosa Fernández", dniAutorizado: "72130948", zona: "Churín", fecha: "Hoy, 09:41", estado: "pendiente" },
  { id: "t3", evento: "Azúcar — Marzo 2026", titular: "Pedro Salazar", dniTitular: "44782901", autorizado: "Julia Salazar", dniAutorizado: "70981245", zona: "Cartavio", fecha: "Ayer, 16:22", estado: "aprobada" },
  { id: "t4", evento: "Útiles — Marzo 2026", titular: "Nora Chuquipoma", dniTitular: "42091837", autorizado: "Carlos Chuquipoma", dniAutorizado: "71098234", zona: "Casa Grande", fecha: "Ayer, 14:03", estado: "rechazada" },
];

export type Auditoria = { id: string; fecha: string; usuario: string; accion: string; detalle: string };
export const auditoria: Auditoria[] = [
  { id: "a1", fecha: "13/07/2026 10:32", usuario: "admin1", accion: "Creó jefe", detalle: "Juan Pérez — zona Churín" },
  { id: "a2", fecha: "13/07/2026 10:15", usuario: "admin1", accion: "Aprobó entrega a tercero", detalle: "DNI 43871209 → 76812340" },
  { id: "a3", fecha: "13/07/2026 09:48", usuario: "admin2", accion: "Cargó Excel", detalle: "Azúcar Marzo 2026 (450 filas)" },
  { id: "a4", fecha: "13/07/2026 09:12", usuario: "admin1", accion: "Reseteó contraseña", detalle: "María Quispe" },
  { id: "a5", fecha: "12/07/2026 17:41", usuario: "admin1", accion: "Cerró evento", detalle: "Azúcar Diciembre 2025" },
  { id: "a6", fecha: "12/07/2026 15:20", usuario: "admin2", accion: "Editó zona", detalle: "Paramonga → activa" },
];

export const beneficiariosMock = Array.from({ length: 24 }).map((_, i) => ({
  id: `b${i + 1}`,
  dni: (40000000 + Math.floor(Math.random() * 9999999)).toString(),
  nombre: [
    "Julio Ramírez Ponce", "Carmen Ávila Ríos", "Enrique Solís Vera", "Patricia León Vargas",
    "Manuel Cárdenas Cruz", "Silvia Peña Muñoz", "Óscar Zavaleta Uribe", "Lidia Morales Farfán",
    "Jorge Bazán Espinoza", "Nora Chuquipoma", "Segundo Vílchez", "Mario Fernández",
    "Julia Salazar", "Carlos Mendoza", "Rosa Fernández", "Pedro Salazar",
    "Isabel Vílchez", "Elena Vega", "Ana Torres", "Luis Rojas",
    "María Quispe", "Juan Pérez", "Rosa Alvarado", "Pedro Silva",
  ][i],
  zona: ["Casa Grande", "Churín", "Cartavio", "Paramonga"][i % 4],
  estado: i % 5 === 0 ? "pendiente" : "entregado" as "pendiente" | "entregado",
  fechaEntrega: i % 5 === 0 ? "—" : "12/03/2026 14:2" + (i % 10),
}));
