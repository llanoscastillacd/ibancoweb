import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolPantalla } from '../shared/utils/util';
import { AdmLotesComponent } from './pages/adm-lotes/adm-lotes.component';
import { ProcesarLoteComponent } from './pages/procesar-lote/procesar-lote.component';
import { SaveLoteComponent } from './pages/save-lote/save-lote.component';
import { ViewLoteComponent } from './pages/view-lote/view-lote.component';

const routes: Routes = [
  { path: 'adm', component: AdmLotesComponent },
  { path: 'save', component: SaveLoteComponent, data: { role: RolPantalla.Create } },
  { path: ':nroLote/edit', component: SaveLoteComponent, data: { role: RolPantalla.Edit } },
  { path: ':nroLote', component: ViewLoteComponent },
  { path: ':nroLote/procesar', component: ProcesarLoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotesRoutingModule { }
