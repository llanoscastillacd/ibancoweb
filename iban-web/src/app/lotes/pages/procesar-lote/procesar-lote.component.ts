import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MostrarProgresoComponent } from 'src/app/shared/components/mostrar-progreso/mostrar-progreso.component';
import { ArchivoDto } from 'src/app/shared/models/archivo-dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Util } from 'src/app/shared/utils/util';
import { SolicitudPagoDto } from 'src/app/solicitudes/models/solicitud-pago-dto';
import { SolicitudPagoService } from 'src/app/solicitudes/services/solicitud-pago.service';
import { RequerirConfirmacionProcesoComponent } from '../../components/requerir-confirmacion-proceso/requerir-confirmacion-proceso.component';
import { LotePagoDto } from '../../models/lote-pago-dto';
import { LotePagoProcesadoReq } from '../../models/lote-pago-procesado-req';
import { LotePagoQuery } from '../../models/lote-pago-query';
import { LotePagoService } from '../../services/lote-pago.service';
import { Bancos } from '../../../shared/utils/tipo.enum';

@Component({
  selector: 'app-procesar-lote',
  templateUrl: './procesar-lote.component.html',
  styleUrls: ['./procesar-lote.component.scss']
})
export class ProcesarLoteComponent implements OnInit {

  BCP = Bancos.BCP;
  lotePago: LotePagoDto;
  displayedColumns: string[] = ['select', 'nroSolicitud', 'banco', 'moneda', 'monto', 'estado', 'tipoAbono',
    'nroCuenta', 'tipoDocumentoIdentidad', 'nroDocumentoIdentidad', 'nombreBeneficiario', 'fechaHoraSolicitud'];
  dataSource: MatTableDataSource<SolicitudPagoDto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  archivo: ArchivoDto;
  showSpinner: boolean = false;
  showSpinnerArchivo: boolean = false;
  selection = new SelectionModel<SolicitudPagoDto>(true, []);

  constructor(
    private lotePagoService: LotePagoService,
    private solicitudPagoService: SolicitudPagoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    const nroLote = +(this.route.snapshot.paramMap.get('nroLote')!);
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
      },
      err => {
        this.showSpinner = false;
        this.alertService.error(err);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getTotal(propiedad: keyof Omit<SolicitudPagoDto, 'documentos' | 'fechaHoraSolicitud'>) {
    return this.dataSource?.data?.map(solicitud => solicitud[propiedad])
      .reduce((acc, value) => Number(acc) + Number(value), 0);
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

  procesarLotePago() {
    const dialogRef = this.dialog.open(RequerirConfirmacionProcesoComponent,
      {
        data: {
          nroRegistrosTotales: this.dataSource.data.length,
          nroRegistrosProcesadosConExito: this.selection.selected.length,
          nroRegistrosProcesadosSinExito: this.dataSource.data.length - this.selection.selected.length
        }, disableClose: true
      });
    dialogRef.afterClosed().subscribe(data => {
      if (data.haConfirmado) {
        const dialogRef = this.dialog.open(MostrarProgresoComponent, {
          width: '250px', disableClose: true
        });
        let lotePagoProcesadoReq = new LotePagoProcesadoReq();
        this.dataSource.data.forEach(
          solicitud => {
            (this.selection.selected.includes(solicitud)) ?
              lotePagoProcesadoReq.solicitudesProcesadas.push(solicitud.nroSolicitud)
              : lotePagoProcesadoReq.solicitudesRechazadas.push(solicitud.nroSolicitud);
          }
        )
        this.lotePagoService.procesarLotePago(this.lotePago.nroLote, lotePagoProcesadoReq).subscribe(
          nroLote => {
            dialogRef.close();
            this.alertService.success('Lote procesado con éxito');
            this.router.navigate(['../../' + nroLote], { relativeTo: this.route });
          },
          err => {
            dialogRef.close();
            this.alertService.error(err);
          },
        );
      }
    });
  }

}
