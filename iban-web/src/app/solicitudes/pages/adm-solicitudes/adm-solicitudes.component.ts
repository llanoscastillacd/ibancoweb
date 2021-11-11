import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Opcion } from 'src/app/shared/models/opcion';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TiposService } from 'src/app/shared/services/tipos.service';
import { Tipo } from 'src/app/shared/utils/tipo.enum';
import { SolicitudPagoDto } from '../../models/solicitud-pago-dto';
import { SolicitudPagoQuery } from '../../models/solicitud-pago-query';
import { SolicitudPagoService } from '../../services/solicitud-pago.service';

@Component({
  selector: 'app-adm-solicitudes',
  templateUrl: './adm-solicitudes.component.html',
  styleUrls: ['./adm-solicitudes.component.scss']
})
export class AdmSolicitudesComponent implements OnInit {

  displayedColumns: string[] = ['nroSolicitud', 'banco', 'moneda', 'monto', 'estado', 'tipoAbono',
    'nroCuenta', 'tipoDocumentoIdentidad', 'nroDocumentoIdentidad', 'nombreBeneficiario', 'procesoOrigen', 'solicitadoPor', 'fechaHoraSolicitud'];
  dataSource: MatTableDataSource<SolicitudPagoDto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showSpinner: boolean = false;
  solicitudPagoQuery: SolicitudPagoQuery;
  opcionesBanco: Opcion[];
  opcionesMoneda: Opcion[];
  opcionesTipoAbono: Opcion[];
  opcionesEstadoSolicitudPago: Opcion[];
  @ViewChild('nroSolicitudInput', { static: true}) nroSolicitudInput: ElementRef;
  @ViewChild('solicitadoPorInput', { static: true }) solicitadoPorInput: ElementRef;
  @ViewChild('procesoOrigenInput', { static: true }) procesoOrigenInput: ElementRef;
  @ViewChild('beneficiarioInput', { static: true }) beneficiarioInput: ElementRef;

  constructor(
    private solicitudPagoService: SolicitudPagoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private tiposService: TiposService,
  ) { }

  ngOnInit(): void {
    this.opcionesBanco = this.tiposService.configuracionTipos.data.get(Tipo.Banco)!;
    this.opcionesMoneda = this.tiposService.configuracionTipos.data.get(Tipo.Moneda)!;
    this.opcionesTipoAbono = this.tiposService.configuracionTipos.data.get(Tipo.Tipo_Abono)!;
    this.opcionesEstadoSolicitudPago = this.tiposService.configuracionTipos.data.get(Tipo.Estado_Solicitud_Pago)!;
    this.solicitudPagoQuery = new SolicitudPagoQuery();
    this.listarSolicitudesPagoPorQuery(this.solicitudPagoQuery);
    this.agregarTiempoEsperaInputs();
  }

  showDetail(solicitud: SolicitudPagoDto) {
    this.router.navigate(['../' + solicitud.nroSolicitud], { relativeTo: this.route });
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
    this.showSpinner = true;
    this.solicitudPagoService.querySolicitudPago(solicitudPagoQuery).subscribe(
      solicitudesPago => {
        this.showSpinner = false;
        this.dataSource = new MatTableDataSource(solicitudesPago)
        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.showSpinner = false;
        this.alertService.error(err);
      }
    );
  }

  limpiarFiltros() {
    this.solicitudPagoQuery = new SolicitudPagoQuery();
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

}
