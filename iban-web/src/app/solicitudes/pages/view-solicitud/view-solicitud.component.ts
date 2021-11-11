import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DocumentoDto, SolicitudPagoDto } from '../../models/solicitud-pago-dto';
import { SolicitudPagoService } from '../../services/solicitud-pago.service';
import { combineLatest } from 'rxjs';
import { LotePagoService } from '../../../lotes/services/lote-pago.service';
import { LotePagoDto } from '../../../lotes/models/lote-pago-dto';
import { LoteSolicitudDto } from 'src/app/lotes/models/lote-solicitud-dto';
import { Bancos } from '../../../shared/utils/tipo.enum';
import { MatDialog } from '@angular/material/dialog';
import { RequerirConfirmacionAnularSolicitudComponent } from '../../components/requerir-confirmacion-anular-solicitud/requerir-confirmacion-anular-solicitud.component';
import { MostrarProgresoComponent } from '../../../shared/components/mostrar-progreso/mostrar-progreso.component';

@Component({
  selector: 'app-view-solicitud',
  templateUrl: './view-solicitud.component.html',
  styleUrls: ['./view-solicitud.component.scss']
})
export class ViewSolicitudComponent implements OnInit {

  tipoBancos = Bancos;
  solicitudPago: SolicitudPagoDto;
  lotesPago: LotePagoDto[];
  showSpinner: boolean = false;

  displayedDocumentoColumns: string[] = ['tipoDocumento', 'nroDocumento', 'moneda', 'monto'];
  displayedLotePagoColumns: string[] = ['nroLote', 'estado', 'resultadoProceso',
    'referencia', 'registradoPor', 'fechaHoraRegistro'];
  dataSourceDocumentos: MatTableDataSource<DocumentoDto>;
  dataSourceLotesPago: MatTableDataSource<LoteSolicitudDto>;

  constructor(
    private solicitudPagoService: SolicitudPagoService,
    private lotePagoService: LotePagoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    const nroSolicitud = +(this.route.snapshot.paramMap.get('nroSolicitud')!);
    combineLatest([
      this.solicitudPagoService.findByNroSolicitud(nroSolicitud),
      this.lotePagoService.findByNroSolicitud(nroSolicitud)
    ]).subscribe(
      ([solicitudPago, lotesPago]) =>{
        this.solicitudPago = solicitudPago;
        this.dataSourceDocumentos = new MatTableDataSource(solicitudPago.documentos);
        this.dataSourceLotesPago = new MatTableDataSource(lotesPago);
        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
        this.alertService.error(err);
      }
    );
  }

  anularSolicitudPago() {
    const dialogRef = this.dialog.open(RequerirConfirmacionAnularSolicitudComponent,
      {
        data: {
          nroSolicitud: this.solicitudPago.nroSolicitud
        }, disableClose: true
      });
    
      dialogRef.afterClosed().subscribe( data => {
        if(data.haConfirmado) {
          const dialogProgress = this.dialog.open(MostrarProgresoComponent, {
            width: '250px', disableClose: true
          });
          this.solicitudPagoService.deleteSolicitudPago(this.solicitudPago.nroSolicitud).subscribe(
            nroSolicitud => {
              dialogProgress.close();
              this.alertService.success('Solicitud de Pago anulado con éxito');              
              this.solicitudPago.estado = 'ANULADO';  
            },
            err => {
              dialogProgress.close();
              this.alertService.error(err);
            }
          );
        }        
      });
  }
}
