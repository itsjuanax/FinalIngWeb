import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModeloService } from '../../services/modelo.service';
import { Modelo } from '../../models/modelo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.scss'
})
export class ModeloComponent implements OnInit {
  modelos: Modelo[] = [];

  nuevoModelo: Modelo = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  editando: boolean = false;
  editModeloId: number | null = null;

  constructor(private modeloService: ModeloService) {}

  ngOnInit(): void {
    this.obtenerModelos();
  }

  obtenerModelos(): void {
    this.modeloService.getModelos().subscribe({
      next: (data) => (this.modelos = data),
      error: () =>
        Swal.fire('Error', '❌ Error al cargar los modelos', 'error')
    });
  }

  crearModelo(): void {
    if (!this.nuevoModelo.nombre || !this.nuevoModelo.descripcion) {
      Swal.fire('Campos requeridos', '⚠️ Nombre y descripción son obligatorios', 'warning');
      return;
    }

    this.modeloService.addModelo(this.nuevoModelo).subscribe({
      next: () => {
        Swal.fire('Modelo creado', '✅ El modelo fue agregado con éxito', 'success');
        this.nuevoModelo = { id: 0, nombre: '', descripcion: '' };
        this.obtenerModelos();
      },
      error: () =>
        Swal.fire('Error', '❌ Error al crear el modelo', 'error')
    });
  }

  eliminarModelo(id: number): void {
    Swal.fire({
      title: '¿Eliminar modelo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modeloService.deleteModelo(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', '🗑️ El modelo fue eliminado', 'success');
            this.obtenerModelos();
          },
          error: () =>
            Swal.fire('Error', '❌ Error al eliminar el modelo', 'error')
        });
      }
    });
  }

  iniciarEdicion(modelo: Modelo): void {
    this.editando = true;
    this.nuevoModelo = { ...modelo };
    this.editModeloId = modelo.id;
  }

  guardarEdicion(): void {
    if (this.editModeloId === null) return;

    this.modeloService.updateModelo(this.editModeloId, this.nuevoModelo).subscribe({
      next: () => {
        Swal.fire('Actualizado', '✏️ El modelo fue actualizado', 'success');
        this.editando = false;
        this.editModeloId = null;
        this.nuevoModelo = { id: 0, nombre: '', descripcion: '' };
        this.obtenerModelos();
      },
      error: () =>
        Swal.fire('Error', '❌ Error al actualizar el modelo', 'error')
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.editModeloId = null;
    this.nuevoModelo = { id: 0, nombre: '', descripcion: '' };
  }
}
