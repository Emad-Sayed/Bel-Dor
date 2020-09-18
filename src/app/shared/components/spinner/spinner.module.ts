import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerDirective } from './directive/spinner.directive';
import { SpinnerComponent } from './spinner.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SpinnerModule { }
