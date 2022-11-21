import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIALS } from './components/materials';
import { HttpClientModule } from '@angular/common/http';
import { ActionBarComponent } from './components/action-bar/action-bar.component';

@NgModule({
  declarations: [ActionBarComponent],
  imports: [CommonModule, HttpClientModule, ...MATERIALS],
    exports: [...MATERIALS, ActionBarComponent],
})
export class SharedModule {}
