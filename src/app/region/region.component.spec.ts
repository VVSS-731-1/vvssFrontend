import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegionComponent} from './region.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {EmployeesComponent} from '../employees/employees.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {ProfileComponent} from '../profile/profile.component';
import {EmployeesSkillProfileComponent} from '../employees-skill-profile/employees-skill-profile.component';
import {ProjectsComponent} from '../projects/projects.component';
import {MasterdataComponent} from '../master-data/masterdata.component';
import {RegisterComponent} from '../register/register.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {By} from "@angular/platform-browser";

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesComponent,
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
        AppRoutingModule,
        HttpClientTestingModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a tble of regions', () => {
    const compiled = fixture.debugElement;
    const tableRows = compiled.query(By.css('div'));
    expect(tableRows).toBe(2);
  });
});
