import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {ProjectsComponent} from './projects/projects.component';
import {EmployeesSkillProfileComponent} from './employees-skill-profile/employees-skill-profile.component';
import {MasterdataComponent} from './master-data/masterdata.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardService} from './guards/auth-guard.service';
import {AppRoutingModule, routes} from './app-routing.module';
import {LoginService} from './services/login.service';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {CardModule, CheckboxModule, DialogModule, PaginatorModule, PickListModule, SliderModule, TableModule} from 'primeng';
import {ButtonModule} from 'primeng/button';
import {CookieService} from 'ngx-cookie-service';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {EmployeesComponent} from './employees/employees.component';
import {RegionComponent} from './region/region.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    EmployeesSkillProfileComponent,
    ProjectsComponent,
    MasterdataComponent,
    RegisterComponent,
    EmployeesComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    FormsModule,
    ButtonModule,
    RadioButtonModule,
    PickListModule,
    SliderModule,
    CardModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    CommonModule,
    PaginatorModule,
    SliderModule,
  ],
  providers: [
    LoginService,
    AuthGuardService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
