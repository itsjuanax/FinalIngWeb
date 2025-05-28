import { Routes } from '@angular/router';
import { ModeloComponent } from './pages/modelo/modelo.component';

export const routes: Routes = [
  { path: 'modelo', component: ModeloComponent },
  { path: '', redirectTo: 'modelo', pathMatch: 'full' }
];
