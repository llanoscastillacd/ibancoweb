import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Opcion } from 'src/app/shared/models/opcion';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TiposService } from 'src/app/shared/services/tipos.service';
import { Tipo } from 'src/app/shared/utils/tipo.enum';
import { RolPantalla } from 'src/app/shared/utils/util';
import { LotePagoCreateReq } from '../../models/lote-pago-create-req';
import { LotePagoService } from '../../services/lote-pago.service';
import { MatDialog } from '@angular/material/dialog';
import { MostrarProgresoComponent } from 'src/app/shared/components/mostrar-progreso/mostrar-progreso.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LotePagoDto } from '../../models/lote-pago-dto';
import { LotePagoQuery } from '../../models/lote-pago-query';
import { combineLatest } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudPagoDto } from 'src/app/solicitudes/models/solicitud-pago-dto';
import { MatPaginator } from '@angular/material/paginator';
import { SolicitudPagoService } from 'src/app/solicitudes/services/solicitud-pago.service';
import { SolicitudPagoQuery } from 'src/app/solicitudes/models/solicitud-pago-query';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { LotePagoUpdateReq } from '../../models/lote-pago-update-req';

@Component({
  selector: 'app-save-lote',
  templateUrl: './save-lote.component.html',
  styleUrls: ['./save-lote.component.scss']
})
export class SaveLoteComponent implements OnInit {

  lotePagoCreateReq: LotePagoCreateReq;
  BCP: number = 1;

  lotePago: LotePagoDto;
  displayedColumnsSolicitudesDelLote: string[] = ['nroSolicitud', 'banco', 'moneda', 'monto', 'estado', 'tipoAbono',
    'nroCuenta', 'tipoDocumentoIdentidad', 'nroDocumentoIdentidad', 'nombreBeneficiario', 'procesoOrigen', 'solicitadoPor', 'fechaHoraSolicitud', 'accion'];
  dataSourceSolicitudesDelLote: MatTableDataSource<SolicitudPagoDto>;
  @ViewChild('paginatorSolicitudesDelLote') paginatorSolicitudesDelLote: MatPaginator;

  displayedColumnsSolicitudes: string[] = ['select', 'nroSolicitud', 'banco', 'moneda', 'monto', 'estado', 'tipoAbono',
    'nroCuenta', 'tipoDocumentoIdentidad', 'nroDocumentoIdentidad', 'nombreBeneficiario', 'procesoOrigen', 'solicitadoPor',
    'fechaHoraSolicitud'];
  dataSourceSolicitudes: MatTableDataSource<SolicitudPagoDto>;
  selection = new SelectionModel<SolicitudPagoDto>(true, []);
  @ViewChild('paginatorSolicitudes') paginatorSolicitudes: MatPaginator;

  role: RolPantalla;
  solicitudPagoQuery: SolicitudPagoQuery;
  opcionesBanco: Opcion[];
  opcionesMoneda: Opcion[];
  opcionesTipoCuenta: Opcion[];
  opcionesTipoAbono: Opcion[];
  opcionesEstadoSolicitudPago: Opcion[];
  opcionesExonerarItf: Opcion[];
  @ViewChild('nroSolicitudInput', { static: false }) nroSolicitudInput: ElementRef;
  @ViewChild('solicitadoPorInput', { static: false }) solicitadoPorInput: ElementRef;
  @ViewChild('procesoOrigenInput', { static: false }) procesoOrigenInput: ElementRef;
  @ViewChild('beneficiarioInput', { static: false }) beneficiarioInput: ElementRef;

  showSpinner: boolean = false;
  showSpinnerSolicitudes: boolean = false;

  constructor(
    private lotePagoService: LotePagoService,
    private solicitudPagoService: SolicitudPagoService,
    private tiposService: TiposService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.opcionesBanco = this.tiposService.configuracionTipos.data.get(Tipo.Banco)!;
    this.opcionesMoneda = this.tiposService.configuracionTipos.data.get(Tipo.Moneda)!;
    this.opcionesTipoCuenta = this.tiposService.configuracionTipos.data.get(Tipo.Tipo_Cuenta_Cargo)!;
    this.opcionesTipoAbono = this.tiposService.configuracionTipos.data.get(Tipo.Tipo_Abono)!;
    this.opcionesEstadoSolicitudPago = this.tiposService.configuracionTipos.data.get(Tipo.Estado_Solicitud_Pago)!;
    this.opcionesExonerarItf = this.tiposService.configuracionTipos.data.get(Tipo.Exonerar_Itf)!;
    this.route.data.subscribe(e => {
      this.role = e.role;
      if (this.role == RolPantalla.Create) {
        this.lotePagoCreateReq = new LotePagoCreateReq();
      } else {
        this.showSpinner = true;
        const nroLote = +(this.route.snapshot.paramMap.get('nroLote')!);
        let lotePagoQuery = new LotePagoQuery();
        lotePagoQuery.nroLote = nroLote;
        this.solicitudPagoQuery = new SolicitudPagoQuery();
        combineLatest([
          this.lotePagoService.queryLotePago(lotePagoQuery),
          this.solicitudPagoService.findByNroLote(nroLote)
        ]).subscribe(
          ([lotesPago, solicitudesDelLote]) => {
            this.showSpinner = false;
            this.lotePago = lotesPago[0];
            this.dataSourceSolicitudesDelLote = new MatTableDataSource(solicitudesDelLote)
            this.dataSourceSolicitudesDelLote.paginator = this.paginatorSolicitudesDelLote;
            this.solicitudPagoQuery.estado = this.opcionesEstadoSolicitudPago.find(e => e.valor.toUpperCase() === 'SOLICITADO')?.valor!;
            this.solicitudPagoQuery.idBanco = +this.opcionesBanco.find(b => b.descripcion === lotesPago[0].banco)?.valor!;
            this.solicitudPagoQuery.moneda = this.opcionesMoneda.find(m => m.descripcion === lotesPago[0].moneda)?.valor!;
            this.listarSolicitudesPagoPorQuery(this.solicitudPagoQuery);
          },
          err => {
            this.showSpinner = false;
            this.alertService.error(err);
          }
        );
        this.changeDetector.detectChanges();
        this.agregarTiempoEsperaInputs();
      }
    });
  }

  saveLote() {
    const dialogRef = this.dialog.open(MostrarProgresoComponent, {
      width: '250px', disableClose: true
    });
    if (this.role == RolPantalla.Create) {
      if(this.lotePagoCreateReq.idBanco == this.BCP){
        this.lotePagoCreateReq.exoneracionItf = Boolean(Number(this.lotePagoCreateReq.exoneracionItf));
      }
      this.lotePagoService.create(this.lotePagoCreateReq).subscribe(
        nroLote => {
          dialogRef.close();
          this.alertService.success('Creación con éxito');
          this.router.navigate(['../' + nroLote], { relativeTo: this.route });
        },
        err => {
          dialogRef.close();
          this.alertService.error(err);
        },
      );
    } else {
      let lotePagoUpdateReq = new LotePagoUpdateReq();
      this.dataSourceSolicitudesDelLote.data
        .forEach(solicitud => lotePagoUpdateReq.solicitudesPago.push(solicitud.nroSolicitud));
      this.lotePagoService.update(this.lotePago.nroLote, lotePagoUpdateReq).subscribe(
        nroLote => {
          dialogRef.close();
          this.alertService.success('Actualización con éxito');
          this.router.navigate(['../../' + nroLote], { relativeTo: this.route });
        },
        err => {
          dialogRef.close();
          this.alertService.error(err);
        },
      );
    }
  }

  regresar() {
    if (this.role == RolPantalla.Create) {
      this.router.navigate(['../adm'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../adm'], { relativeTo: this.route });
    }
  }

  getTotal(propiedad: keyof Omit<SolicitudPagoDto, 'documentos' | 'fechaHoraSolicitud'>) {
    return this.dataSourceSolicitudesDelLote?.data?.map(solicitud => solicitud[propiedad])
      .reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  filtrarSolicitudes() {
    if (this.solicitudPagoQuery.solicitadoPor == '') {
      this.solicitudPagoQuery.solicitadoPor = undefined;
    }
    if (this.solicitudPagoQuery.procesoOrigen == '') {
      this.solicitudPagoQuery.procesoOrigen = undefined;
    }
    if (this.solicitudPagoQuery.beneficiario == '') {
      this.solicitudPagoQuery.beneficiario = undefined;
    }
    this.listarSolicitudesPagoPorQuery(this.solicitudPagoQuery);
  }

  listarSolicitudesPagoPorQuery(solicitudPagoQuery: SolicitudPagoQuery) {
    this.showSpinnerSolicitudes = true;
    this.solicitudPagoService.querySolicitudPago(solicitudPagoQuery).subscribe(
      solicitudesPago => {
        this.showSpinnerSolicitudes = false;
        this.dataSourceSolicitudes = new MatTableDataSource(solicitudesPago)
        this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
        this.validarTablaSolicitudes();
      },
      err => {
        this.showSpinnerSolicitudes = false;
        this.alertService.error(err);
      }
    );
  }

  limpiarFiltros() {
    this.solicitudPagoQuery = new SolicitudPagoQuery();
    this.solicitudPagoQuery.estado = this.opcionesEstadoSolicitudPago.find(e => e.valor.toUpperCase() === 'SOLICITADO')?.valor!;
    this.solicitudPagoQuery.idBanco = +this.opcionesBanco.find(b => b.descripcion === this.lotePago.banco)?.valor!;
    this.solicitudPagoQuery.moneda = this.opcionesMoneda.find(m => m.descripcion === this.lotePago.moneda)?.valor!;
    this.listarSolicitudesPagoPorQuery(this.solicitudPagoQuery);
  }

  agregarTiempoEsperaInputs() {
    fromEvent(this.nroSolicitudInput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.filtrarSolicitudes();
    });
    fromEvent(this.solicitadoPorInput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.filtrarSolicitudes();
    });
    fromEvent(this.procesoOrigenInput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.filtrarSolicitudes();
    });
    fromEvent(this.beneficiarioInput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.filtrarSolicitudes();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceSolicitudes?.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceSolicitudes.data.forEach(row => this.selection.select(row));
  }

  validarTablaSolicitudes() {
    let nuevaListaSolicitudes: SolicitudPagoDto[] = [];
    nuevaListaSolicitudes = this.dataSourceSolicitudes.data;

    if (this.dataSourceSolicitudes.data.length >= this.dataSourceSolicitudesDelLote.data.length) {
      this.dataSourceSolicitudes.data.forEach(s => {
        this.dataSourceSolicitudesDelLote.data.find(l => {
          if (s.nroSolicitud == l.nroSolicitud) {
            nuevaListaSolicitudes = nuevaListaSolicitudes.filter(n => n.nroSolicitud != s.nroSolicitud);
          }
        });
      })
    } else {
      this.dataSourceSolicitudesDelLote.data.forEach(l => {
        this.dataSourceSolicitudes.data.find(s => {
          if (l.nroSolicitud == s.nroSolicitud) {
            nuevaListaSolicitudes = nuevaListaSolicitudes.filter(n => n.nroSolicitud != l.nroSolicitud);
          }
        });
      })
    }

    this.dataSourceSolicitudes = new MatTableDataSource(nuevaListaSolicitudes);
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
  }

  agregarSolicitudes() {
    let solicitudesDelLote: SolicitudPagoDto[] = [];
    solicitudesDelLote = this.dataSourceSolicitudesDelLote.data;
    this.selection.selected.forEach(e => {
      solicitudesDelLote.push(e);
    });
    this.dataSourceSolicitudesDelLote = new MatTableDataSource(solicitudesDelLote);
    this.dataSourceSolicitudesDelLote.paginator = this.paginatorSolicitudesDelLote;

    let solicitudesNoSeleccionada: SolicitudPagoDto[] = [];
    this.dataSourceSolicitudes.data.forEach(
      e => {
        if (!this.selection.selected.includes(e)) {
          solicitudesNoSeleccionada.push(e);
        };
      }
    )
    this.dataSourceSolicitudes = new MatTableDataSource(solicitudesNoSeleccionada);
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
    this.selection.clear();
  }

  eliminarSolicitud(solicitudPago: SolicitudPagoDto) {
    let solicitudesDelLote: SolicitudPagoDto[] = [];
    solicitudesDelLote = this.dataSourceSolicitudesDelLote.data;
    solicitudesDelLote = solicitudesDelLote.filter(s => s.nroSolicitud != solicitudPago.nroSolicitud);
    this.dataSourceSolicitudesDelLote = new MatTableDataSource(solicitudesDelLote);
    this.dataSourceSolicitudesDelLote.paginator = this.paginatorSolicitudesDelLote;

    let solicitudes: SolicitudPagoDto[] = [];
    solicitudes = this.dataSourceSolicitudes.data;
    solicitudes.push(solicitudPago);
    this.dataSourceSolicitudes = new MatTableDataSource(solicitudes);
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
  }

}
