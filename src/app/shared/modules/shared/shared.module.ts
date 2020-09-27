import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from '../../components/spinner/spinner.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,

    SpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    
    SpinnerModule
  ]
})
export class SharedModule { }
