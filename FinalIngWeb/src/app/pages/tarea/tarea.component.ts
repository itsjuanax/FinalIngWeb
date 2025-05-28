import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];

  nuevaTarea: Tarea = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  editando: boolean = false;
  editTareaId: number | null = null;

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(): void {
    this.tareaService.getTareas().subscribe({
      next: (data) => (this.tareas = data),
      error: () =>
        Swal.fire('Error', '❌ Error al cargar las tareas', 'error')
    });
  }

  crearTarea(): void {
    if (!this.nuevaTarea.nombre || !this.nuevaTarea.descripcion) {
      Swal.fire('Campos requeridos', '⚠️ Nombre y descripción son obligatorios', 'warning');
      return;
    }

    this.tareaService.addTarea(this.nuevaTarea).subscribe({
      next: () => {
        Swal.fire('Tarea creada', '✅ La tarea fue agregada con éxito', 'success');
        this.nuevaTarea = { id: 0, nombre: '', descripcion: '' };
        this.obtenerTareas();
      },
      error: () =>
        Swal.fire('Error', '❌ Error al crear la tarea', 'error')
    });
  }

  eliminarTarea(id: number): void {
    Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareaService.deleteTarea(id).subscribe({
          next: () => {
            Swal.fire('Eliminada', '🗑️ La tarea fue eliminada', 'success');
            this.obtenerTareas();
          },
          error: () =>
            Swal.fire('Error', '❌ Error al eliminar la tarea', 'error')
        });
      }
    });
  }

  iniciarEdicion(tarea: Tarea): void {
    this.editando = true;
    this.nuevaTarea = { ...tarea };
    this.editTareaId = tarea.id;
  }

  guardarEdicion(): void {
    if (this.editTareaId === null) return;

    this.tareaService.updateTarea(this.editTareaId, this.nuevaTarea).subscribe({
      next: () => {
        Swal.fire('Actualizada', '✏️ La tarea fue actualizada', 'success');
        this.editando = false;
        this.editTareaId = null;
        this.nuevaTarea = { id: 0, nombre: '', descripcion: '' };
        this.obtenerTareas();
      },
      error: () =>
        Swal.fire('Error', '❌ Error al actualizar la tarea', 'error')
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.editTareaId = null;
    this.nuevaTarea = { id: 0, nombre: '', descripcion: '' };
  }
}
