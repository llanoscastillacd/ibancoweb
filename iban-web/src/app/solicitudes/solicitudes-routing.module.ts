import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmSolicitudesComponent } from './pages/adm-solicitudes/adm-solicitudes.component';
import { ViewSolicitudComponent } from './pages/view-solicitud/view-solicitud.component';

const routes: Routes = [
  { path: 'adm', component: AdmSolicitudesComponent },
  { path: ':nroSolicitud', component: ViewSolicitudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
