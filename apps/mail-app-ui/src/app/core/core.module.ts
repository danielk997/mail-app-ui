import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [LoginComponent, HeaderComponent, SideNavComponent],
  imports: [BrowserModule, SharedModule],
  exports: [LoginComponent, HeaderComponent, SideNavComponent],
})
export class CoreModule {}
