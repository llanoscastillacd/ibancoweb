import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-requerir-confirmacion-proceso',
  templateUrl: './requerir-confirmacion-proceso.component.html',
  styleUrls: ['./requerir-confirmacion-proceso.component.scss']
})
export class RequerirConfirmacionProcesoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequerirConfirmacionProcesoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      nroRegistrosTotales: number,
      nroRegistrosProcesadosConExito: number,
      nroRegistrosProcesadosSinExito: number
    }
  ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close({ haConfirmado: false });
  }

  confirmar() {
    this.dialogRef.close({ haConfirmado: true });
  }

}
