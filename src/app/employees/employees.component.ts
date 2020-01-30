import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {EmployeeService} from '../services/employee.service';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {SelectItem} from 'primeng';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private employeeService: EmployeeService, private cookieService: CookieService,
              private userService: UserService, private projectService: ProjectService) {
  }

  employeeArray: User[];
  cols: any[];
  selectedEmployee: User;
  newEmployee: boolean;
  employee: User;
  displayDialog: boolean;
  supervisors: User[];
  projects: Project[];
  supervisorsNamesForDropdown: SelectItem[];
  projectsNameForDropdown: SelectItem[];

  supervisorTest: User;

  ngOnInit() {
    this.getAllEmployees();
    this.cols = [
      {field: 'id', header: 'ID', width: '150px'},
      {field: 'firstName', header: 'First Name', width: '150px'},
      {field: 'lastName', header: 'Last Name', width: '150px'},
      {field: 'username', header: 'Username', width: '150px'},
      {field: 'email', header: 'E-mail', width: '150px'},
      {field: 'admin', header: 'Admin', width: '150px'},
      {field: 'counter', header: 'Nb Failed Attempts', width: '150px'},
      //{field: 'supervisor', header: 'Supervisor', width: '150px'}
    ];

    /**
     this.supervisors = [
     {
        id: 3,
        firstName: 'Supervisor1',
        lastName: 'Super',
        username: 'super',
        email: 'super@gmail.com',
        admin: true,
        counter: 0,
        projects: [],
        status: true,
        supervisor: null,
        supervising: []
      }
     ];
     this.supervisorTest = {
      id: 3,
      firstName: 'Supervisor1',
      lastName: 'Super',
      username: 'super',
      email: 'super@gmail.com',
      admin: true,
      counter: 0,
      projects: [],
      status: true,
      supervisor: null,
      supervising: []
    };
     this.projects = [
     {id: 1, name: 'Project1', description: '....', status: true, duration: '10', industry: null, customer: null},
     {id: 2, name: 'Project2', description: 'Longer Description.', status: false, duration: '12', industry: null, customer: null}
     ];**/
    this.createSupervisorsLabels();
    this.createProjectsLabels();
  }

  getAllEmployees() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.employeeArray = response;
      }
    );
  }

  cloneEmployee(employee: User): User {
    const empl = Object.assign({}, employee);
    return empl;
  }

  showDialogToAdd() {
    this.newEmployee = true;
    this.employee = {
      id: 1,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      admin: true,
      counter: 0,
      projects: [],
      status: true,
      supervisor: null,
      supervising: []
    };
    this.displayDialog = true;
    this.selectedEmployee = {
      id: 1,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      admin: true,
      counter: 0,
      projects: [],
      status: true,
      supervisor: null,
      supervising: []
    };
  }

  onRowSelect(event) {
    this.employee = this.cloneEmployee(event.data);
    this.newEmployee = false;
    this.displayDialog = true;
  }

  private createSupervisorsLabels() {
    this.supervisorsNamesForDropdown = [{label: 'No supervisor', value: null}];
    for (let i = 0; i < this.employeeArray.length; i++) {
      this.supervisorsNamesForDropdown.push({label: this.employeeArray[i].username, value: this.employeeArray[i].username});
    }
  }

  private createProjectsLabels() {
    this.projectsNameForDropdown = [{label: 'No project', value: null}];
    for (let i = 0; i < this.projects.length; i++) {
      this.projectsNameForDropdown.push({label: this.projects[i].id.toString(), value: this.projects[i].id});
    }
  }

  save() {
    if (this.newEmployee) {
      this.userService.addUser(this.selectedEmployee).subscribe(
        () => {
          this.toastrService.success('User inserted successfully.');
          this.getAllEmployees();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getAllEmployees();
          } else {
            this.toastrService.error('Could not insert user!');
          }
        });
    } else {
      this.userService.editUser(this.selectedEmployee).subscribe(
        () => {
          this.toastrService.success('Skill updated successfully.');
          this.getAllEmployees();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.toastrService.success('Skill updated successfully.');
            this.getAllEmployees();
          } else {
            this.toastrService.error('Could not update skill!');
          }
        });
    }
    this.displayDialog = false;
  }

}
