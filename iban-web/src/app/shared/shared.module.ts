import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UnderScoreToSpacePipe } from './pipes/under-score-to-space.pipe';
import { CodUsuarioPipe } from './pipes/cod-usuario.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MonedaPipe } from './pipes/moneda.pipe';
import { ReplaceNullPipe } from './pipes/replace-null.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MostrarProgresoComponent } from './components/mostrar-progreso/mostrar-progreso.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BytesToPipe } from './pipes/bytes-to.pipe';

@NgModule({
  declarations: [
    UnderScoreToSpacePipe,
    CodUsuarioPipe,
    MonedaPipe,
    ReplaceNullPipe,
    MostrarProgresoComponent,
    BytesToPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    UnderScoreToSpacePipe,
    CodUsuarioPipe,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MonedaPipe,
    ReplaceNullPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    BytesToPipe
  ]
})
export class SharedModule { }
