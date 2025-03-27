import { Categoria } from "../enums/category_enums";

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: File | string | null;
  categoria: Categoria;
  stock: number;
  archivo_audio?: File | string | null;
}

export interface ProductoResponse extends Omit<Producto, 'imagen' | 'archivo_audio'> {
  imagen: string | null;
  archivo_audio: string | null;
}