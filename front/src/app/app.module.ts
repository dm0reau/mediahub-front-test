import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InMemoryAuthGateway } from '../domain/adapters/in-memory-auth.gateway';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: 'AuthGateway',
      useClass: InMemoryAuthGateway,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
