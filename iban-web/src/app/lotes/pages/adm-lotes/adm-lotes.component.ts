import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Opcion } from 'src/app/shared/models/opcion';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TiposService } from 'src/app/shared/services/tipos.service';
import { Tipo } from 'src/app/shared/utils/tipo.enum';
import { LotePagoDto } from '../../models/lote-pago-dto';
import { LotePagoQuery } from '../../models/lote-pago-query';
import { LotePagoService } from '../../services/lote-pago.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-adm-lotes',
  templateUrl: './adm-lotes.component.html',
  styleUrls: ['./adm-lotes.component.scss']
})
export class AdmLotesComponent implements OnInit {

  displayedColumns: string[] = ['nroLote', 'banco', 'moneda', 'nroCuentaCargo', 'nroRegistros',
    'montoTotal', 'estado', 'registradoPor', 'fechaHoraRegistro'];
  dataSource: MatTableDataSource<LotePagoDto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showSpinner: boolean = false;
  lotePagoQuery: LotePagoQuery;
  opcionesBanco: Opcion[];
  opcionesMoneda: Opcion[];
  opcionesEstadoLotePago: Opcion[];
  @ViewChild('nroLoteInput', { static: true }) nroLoteInput: ElementRef;

  constructor(
    private lotePagoService: LotePagoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private tiposService: TiposService,
  ) { }

  ngOnInit(): void {
    this.opcionesBanco = this.tiposService.configuracionTipos.data.get(Tipo.Banco)!;
    this.opcionesMoneda = this.tiposService.configuracionTipos.data.get(Tipo.Moneda)!;
    this.opcionesEstadoLotePago = this.tiposService.configuracionTipos.data.get(Tipo.Estado_Lote_Pago)!;
    this.lotePagoQuery = new LotePagoQuery();
    this.listarLotesPagoPorQuery(this.lotePagoQuery);
    this.agregarTiempoEsperaInputs();
  }

  showDetail(lote: LotePagoDto) {
    this.router.navigate(['../' + lote.nroLote], { relativeTo: this.route });
  }

  filtrarLotes() {
    this.listarLotesPagoPorQuery(this.lotePagoQuery);
  }

  listarLotesPagoPorQuery(lotePagoQuery: LotePagoQuery) {
    this.showSpinner = true;
    this.lotePagoService.queryLotePago(lotePagoQuery).subscribe(
      lotesPago => {
        this.showSpinner = false;
        this.dataSource = new MatTableDataSource(lotesPago)
        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.showSpinner = false;
        this.alertService.error(err);
      }
    );
  }

  limpiarFiltros() {
    this.lotePagoQuery = new LotePagoQuery();
    this.listarLotesPagoPorQuery(this.lotePagoQuery);
  }

  agregarTiempoEsperaInputs() {
    fromEvent(this.nroLoteInput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() =>{
      this.filtrarLotes();
    });
  }
}
