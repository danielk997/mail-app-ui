import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MATERIALS} from './components/materials';
import {HttpClientModule} from '@angular/common/http';
import {ActionBarComponent} from './components/action-bar/action-bar.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ActionBarComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, ...MATERIALS],
  exports: [...MATERIALS, ActionBarComponent],
})
export class SharedModule {
}
