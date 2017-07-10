import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './componenets/login-page/login-page.component';
import {HomePageComponent} from './componenets/home-page/home-page.component';
import {ContactPageComponent} from './componenets/contact-page/contact-page.component';
import {RegisterPageComponent} from './componenets/register-page/register-page.component';
import {AppHttpService} from './app-http.service';
import MyErrorHandler from './helpers/myErrorHandler';
import {ProfilePageComponent} from './componenets/profile-page/profile-page.component';
import {LoadingContentComponent} from './componenets/loading-content/loading-content.component';
import {ProfilePageResolverService} from "./componenets/profile-page/profile-page-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegisterPageComponent,
    ContactPageComponent,
    ProfilePageComponent,
    LoadingContentComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'contact',
        component: ContactPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        resolve: {
          profile: ProfilePageResolverService
        }
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [AppHttpService, {provide: ErrorHandler, useClass: MyErrorHandler}, ProfilePageResolverService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
