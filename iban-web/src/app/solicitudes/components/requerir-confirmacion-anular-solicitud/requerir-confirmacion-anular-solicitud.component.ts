import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-requerir-confirmacion-anular-solicitud',
  templateUrl: './requerir-confirmacion-anular-solicitud.component.html',
  styleUrls: ['./requerir-confirmacion-anular-solicitud.component.scss']
})
export class RequerirConfirmacionAnularSolicitudComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequerirConfirmacionAnularSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA ) public data: {
      nroSolicitud: number
    }
  ) { }

  ngOnInit(): void {
  }

  confirmar() {
    this.dialogRef.close({ haConfirmado: true });
  }

  cancelar() {
    this.dialogRef.close({ haConfirmado: false });
  }

}
