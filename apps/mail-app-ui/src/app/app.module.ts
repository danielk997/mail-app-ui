import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './shared/notifications/notification.effects';
import { NotifierModule } from 'angular-notifier';
import {SmtpConfigEffects} from "./settings/state/smtp-config.effects";

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-77946468.okta.com/oauth2/default',
  clientId: '0oa78gwrenJZPRBKR5d7',
  redirectUri: window.location.origin + '/login/callback',
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    OktaAuthModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
    NotifierModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([NotificationEffects, SmtpConfigEffects]),
    AppRoutingModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
