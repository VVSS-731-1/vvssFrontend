import {RegionComponent} from './region.component';
import {EmployeesComponent} from '../employees/employees.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {ProfileComponent} from '../profile/profile.component';
import {EmployeesSkillProfileComponent} from '../employees-skill-profile/employees-skill-profile.component';
import {ProjectsComponent} from '../projects/projects.component';
import {MasterdataComponent} from '../master-data/masterdata.component';
import {RegisterComponent} from '../register/register.component';
import {AppRoutingModule} from '../app-routing.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NO_ERRORS_SCHEMA} from '@angular/core';

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

  it('should render the correct title', () => {
    const title = fixture.nativeElement.querySelectorAll('h1')[0];
    expect(title.innerText).toBe('Manage Regions');
  });

  it('should render correct buttons', () => {
    const divs = fixture.nativeElement.querySelectorAll('div');
    expect(divs.length).toBe(2);
    expect(divs[1].querySelectorAll('button').length).toBe(2);
  });

  it('should fire the save() method when save button is clicked', () => {
    spyOn(RegionComponent, 'save');
    const saveBtn = fixture.nativeElement.querySelectorAll('button')[1];
    saveBtn.triggerEventHandler('click', null);

    expect(RegionComponent.save).toHaveBeenCalled();
  });
});
