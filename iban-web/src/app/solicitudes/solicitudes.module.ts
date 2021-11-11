import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { AdmSolicitudesComponent } from './pages/adm-solicitudes/adm-solicitudes.component';
import { SharedModule } from '../shared/shared.module';
import { ViewSolicitudComponent } from './pages/view-solicitud/view-solicitud.component';
import { RequerirConfirmacionAnularSolicitudComponent } from './components/requerir-confirmacion-anular-solicitud/requerir-confirmacion-anular-solicitud.component';


@NgModule({
  declarations: [AdmSolicitudesComponent, ViewSolicitudComponent, RequerirConfirmacionAnularSolicitudComponent],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    SharedModule
  ]
})
export class SolicitudesModule { }
