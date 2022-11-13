import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [LoginComponent, HeaderComponent],
  imports: [BrowserModule, SharedModule],
  exports: [LoginComponent, HeaderComponent],
})
export class CoreModule {}
