import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InMemoryAuthGateway } from '../domain/auth/adapters/in-memory-auth.gateway';
import { NavComponent } from './nav/nav.component';
import { LocalStorageAuthTokenRepository } from '../domain/auth/adapters/local-storage-auth-token.repository';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: 'AuthGateway',
      useFactory: () =>
        new InMemoryAuthGateway(new LocalStorageAuthTokenRepository()),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
