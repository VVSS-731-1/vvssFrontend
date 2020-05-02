import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeesComponent} from './employees.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {LoginComponent} from '../login/login.component';
import {ProfileComponent} from '../profile/profile.component';
import {EmployeesSkillProfileComponent} from '../employees-skill-profile/employees-skill-profile.component';
import {ProjectsComponent} from '../projects/projects.component';
import {MasterdataComponent} from '../master-data/masterdata.component';
import {RegisterComponent} from '../register/register.component';
import {RegionComponent} from '../region/region.component';
import {HomeComponent} from '../home/home.component';
import {User} from '../models/user.model';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
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
      providers: [CookieService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    const users: User[] = [
      {id: 1, firstName: 'Ana', lastName: 'Maria', username: 'anamaria', email: 'anamaria@yahoo.com', admin: false, counter: 0, projects: [], status: true, supervisor: null, supervising: []},
      {id: 2, firstName: 'Ioana', lastName: 'Pop', username: 'ioanapop', email: 'pop@yahoo.com', admin: true, counter: 0, projects: [], status: true, supervisor: null, supervising: []},
      {id: 3, firstName: 'Valer', lastName: 'Maier', username: 'valerm', email: 'valermaier@yahoo.com', admin: false, counter: 0, projects: [], status: false, supervisor: null, supervising: []}
    ];
    component.employeeArray = users;
    component.projects = [];
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a save button', () => {
    const compiled = fixture.debugElement;
    const divs = compiled.nativeElement.querySelectorAll('div');
    expect(divs.length).toBe(2);
    expect(divs[0].querySelectorAll('button').length).toBe(1);
    expect(divs[1].querySelectorAll('button').length).toBe(1);
  });

  it('should render the correct title', () => {
    const title = fixture.nativeElement.querySelectorAll('h1')[0];
    expect(title.innerText).toBe('Manage Employees');
  });
});
