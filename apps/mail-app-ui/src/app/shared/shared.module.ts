import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MATERIALS} from "./components/materials";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ...MATERIALS,
  ],
  exports: [
    ...MATERIALS
  ]
})
export class SharedModule {
}
