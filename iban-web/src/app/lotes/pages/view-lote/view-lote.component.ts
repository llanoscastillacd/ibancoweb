import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LotePagoDto } from '../../models/lote-pago-dto';
import { LotePagoService } from '../../services/lote-pago.service';
import { LotePagoQuery } from '../../models/lote-pago-query';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudPagoDto } from 'src/app/solicitudes/models/solicitud-pago-dto';
import { MatPaginator } from '@angular/material/paginator';
import { SolicitudPagoService } from 'src/app/solicitudes/services/solicitud-pago.service';
import { combineLatest } from 'rxjs';
import { ArchivoDto } from '../../../shared/models/archivo-dto';
import { Util } from 'src/app/shared/utils/util';
import { Bancos } from '../../../shared/utils/tipo.enum';
import { MatDialog } from '@angular/material/dialog';
import { RequerirConfirmacionAnularLoteComponent } from '../../components/requerir-confirmacion-anular-lote/requerir-confirmacion-anular-lote.component';
import { MostrarProgresoComponent } from '../../../shared/components/mostrar-progreso/mostrar-progreso.component';

@Component({
  selector: 'app-view-lote',
  templateUrl: './view-lote.component.html',
  styleUrls: ['./view-lote.component.scss']
})
export class ViewLoteComponent implements OnInit {

  BCP = Bancos.BCP;
  lotePago: LotePagoDto;
  displayedColumns: string[] = ['nroSolicitud', 'banco', 'moneda', 'monto', 'estado', 'tipoAbono',
    'nroCuenta', 'tipoDocumentoIdentidad', 'nroDocumentoIdentidad', 'nombreBeneficiario', 'fechaHoraSolicitud', 'resultadoProceso'];
  dataSource: MatTableDataSource<SolicitudPagoDto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  archivo: ArchivoDto;
  showSpinner: boolean = false;
  showSpinnerArchivo: boolean = false;
  nroRegistrosExitosos: number;

  constructor(
    private lotePagoService: LotePagoService,
    private solicitudPagoService: SolicitudPagoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    const nroLote = +(this.route.snapshot.paramMap.get('nroLote')!);
    this.getLotePago(nroLote);    
  }

  getLotePago(nroLote: number) {
    let lotePagoQuery = new LotePagoQuery();
    lotePagoQuery.nroLote = nroLote;
    combineLatest([
      this.lotePagoService.queryLotePago(lotePagoQuery),
      this.solicitudPagoService.findByNroLote(nroLote)
    ]).subscribe(
      ([lotesPago, solicitudesPago]) => {
        this.showSpinner = false;
        this.lotePago = lotesPago[0];
        this.dataSource = new MatTableDataSource(solicitudesPago)
        this.dataSource.paginator = this.paginator;
        if (lotesPago[0].estado != 'REGISTRADO' && lotesPago[0].estado != 'ANULADO') {
          this.showSpinnerArchivo = true;
          this.lotePagoService.downloadFile(this.lotePago.nroLote).subscribe(
            archivo => {
              this.showSpinnerArchivo = false;
              this.archivo = archivo;
            },
            err => {
              this.showSpinnerArchivo = false;
              this.alertService.error(err);
            }
          )
        }
        if (lotesPago[0].estado == 'PROCESADO') {
          this.nroRegistrosExitosos = solicitudesPago.filter(sp => sp.estado != 'SOLICITADO').length;
        }
      },
      err => {
        this.showSpinner = false;
        this.alertService.error(err);
      }
    );
  }

  getTotal(propiedad: keyof Omit<SolicitudPagoDto, 'documentos' | 'fechaHoraSolicitud'>) {
    return this.dataSource?.data?.map(solicitud => solicitud[propiedad])
      .reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  generarArchivo() {
    this.showSpinnerArchivo = true;
    this.lotePagoService.generateFile(this.lotePago.nroLote).subscribe(
      archivo => {
        this.showSpinnerArchivo = false;
        this.archivo = archivo;
        this.ngOnInit();
      },
      err => {
        this.showSpinnerArchivo = false;
        this.alertService.error(err);
      }
    );
  }

  onClickArchivo() {
    let bytes = Util.base64ToArrayBuffer(this.archivo.contenidoArchivo);
    const file = new Blob([bytes], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = this.archivo.nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  anularLotePago() {
    const dialogRef = this.dialog.open(RequerirConfirmacionAnularLoteComponent,
      {
        data: {
          nroLote: this.lotePago.nroLote
        }, disableClose: true
      });

    dialogRef.afterClosed().subscribe( data => {
      if(data.haConfirmado){
        const dialogProgress = this.dialog.open(MostrarProgresoComponent,{
          width: '250px', disableClose: true
        });
        this.lotePagoService.deleteLotePago(this.lotePago.nroLote).subscribe(
          nroLote => {
            dialogProgress.close();
            this.alertService.success('Lote de Pago anulado con éxito');
            this.getLotePago(this.lotePago.nroLote);
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
