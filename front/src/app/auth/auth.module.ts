import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [LoginService],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
})
export class AuthModule {}
