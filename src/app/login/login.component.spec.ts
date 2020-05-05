import {RegionComponent} from '../region/region.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmployeesComponent} from '../employees/employees.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from './login.component';
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
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      providers: [ LoginService, CookieService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct title', () => {
    const compile = fixture.nativeElement;
    expect(compile.querySelectorAll('h3')[0].innerText).toBe('Proiect Colectiv');
  });

  it('should generate only two input fields, one for username and one for password', () => {
    const compile = fixture.nativeElement;
    expect(compile.querySelectorAll('input').length).toBe(2);
    expect(compile.querySelectorAll('input#username').length).toBe(1);
    expect(compile.querySelectorAll('input#password').length).toBe(1);
  });

  it('should generate a button with Login text', () => {
    const button = fixture.nativeElement.querySelectorAll('button');
    expect(button.length).toBe(1);
    expect(button[0].innerText).toBe('Login');
  });
});
