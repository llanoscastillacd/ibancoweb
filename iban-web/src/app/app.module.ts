import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor';
import { SharedModule } from './shared/shared.module';
import { TiposService } from './shared/services/tipos.service';
import { SessionIncerceptor } from './shared/interceptors/session-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    TiposService, {
      provide: APP_INITIALIZER, useFactory: (ts: TiposService) => () => ts.fetchConfiguracionTipos(),
      deps: [TiposService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionIncerceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
