import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-requerir-confirmacion-anular-lote',
  templateUrl: './requerir-confirmacion-anular-lote.component.html',
  styleUrls: ['./requerir-confirmacion-anular-lote.component.scss']
})
export class RequerirConfirmacionAnularLoteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequerirConfirmacionAnularLoteComponent>,
    @Inject(MAT_DIALOG_DATA ) public data: {
      nroLote: number
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
