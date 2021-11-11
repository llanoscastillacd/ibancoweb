import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iban-web';

  constructor(private sessionService: SessionService,
    @Inject(DOCUMENT) document: any) { }

  ngOnInit() {
    let codUsuario = (document.getElementById('hidnomusu') as HTMLInputElement).value;
    this.sessionService.setCodUsuario(codUsuario);
  }

}
