import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MATERIALS} from "./components/materials";


@NgModule({
  declarations: [],
  imports: [
    ...MATERIALS,
    CommonModule
  ],
  exports: [
    ...MATERIALS
  ]
})
export class SharedModule {
}
