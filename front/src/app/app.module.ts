import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { LocalStorageAuthTokenRepository } from '../domain/auth/adapters/local-storage-auth-token.repository';
import { HttpAuthGateway } from '../domain/auth/adapters/http-auth.gateway';
import { AngularMhHttpClient } from '../infra/adapters/angular-mh-http-client';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: 'AuthGateway',
      useFactory: (httpClient: HttpClient) => {
        const angularMhHttpClient = new AngularMhHttpClient(httpClient);
        return new HttpAuthGateway(
          new LocalStorageAuthTokenRepository(),
          angularMhHttpClient
        );
      },
      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
