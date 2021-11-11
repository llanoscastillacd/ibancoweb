import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotesRoutingModule } from './lotes-routing.module';
import { AdmLotesComponent } from './pages/adm-lotes/adm-lotes.component';
import { SharedModule } from '../shared/shared.module';
import { ViewLoteComponent } from './pages/view-lote/view-lote.component';
import { SaveLoteComponent } from './pages/save-lote/save-lote.component';
import { ProcesarLoteComponent } from './pages/procesar-lote/procesar-lote.component';
import { RequerirConfirmacionProcesoComponent } from './components/requerir-confirmacion-proceso/requerir-confirmacion-proceso.component';
import { RequerirConfirmacionAnularLoteComponent } from './components/requerir-confirmacion-anular-lote/requerir-confirmacion-anular-lote.component';


@NgModule({
  declarations: [AdmLotesComponent, ViewLoteComponent, SaveLoteComponent, ProcesarLoteComponent, RequerirConfirmacionProcesoComponent, RequerirConfirmacionAnularLoteComponent],
  imports: [
    CommonModule,
    LotesRoutingModule,
    SharedModule
  ]
})
export class LotesModule { }
