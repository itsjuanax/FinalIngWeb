import { Routes } from '@angular/router';
import { TareaComponent } from './pages/tarea/tarea.component';

export const routes: Routes = [
  { path: 'tarea', component: TareaComponent },
  { path: '', redirectTo: 'tarea', pathMatch: 'full' }
];