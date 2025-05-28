import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelo } from '../models/modelo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private baseUrl = 'http://localhost:3000/modelos'; // Ajusta al backend real

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los modelos
  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.baseUrl);
  }

  // GET: Obtener un solo modelo por ID
  getModelo(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.baseUrl}/${id}`);
  }

  // POST: Crear un nuevo modelo
  addModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.baseUrl, modelo);
  }

  // PUT: Actualizar un modelo existente
  updateModelo(id: number, modelo: Modelo): Observable<Modelo> {
    return this.http.put<Modelo>(`${this.baseUrl}/${id}`, modelo);
  }

  // DELETE: Eliminar un modelo
  deleteModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
