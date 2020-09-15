import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AuthService } from '../../service/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
