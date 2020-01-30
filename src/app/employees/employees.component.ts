import { Component, OnInit } from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {EmployeeService} from '../services/employee.service';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private employeeService: EmployeeService, private cookieService: CookieService) {
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
      {field: 'isAdmin', header: 'Admin', width: '150px'},
      {field: 'projectIds', header: 'Projects', width: '150px'},
      {field: 'supervisor', header: 'Supervisor', width: '150px'}
    ];
    this.supervisors = [
      {id: 3, firstName: 'Supervisor1', lastName: 'Super', username: 'super', email: 'super@gmail.com', isAdmin: true, projectIds: [], supervisor: null}
    ];
    this.supervisorTest = {id: 3, firstName: 'Supervisor1', lastName: 'Super', username: 'super', email: 'super@gmail.com', isAdmin: true, projectIds: [], supervisor: null};
    this.projects = [
      {id: 1, name: 'Project1', description: '....', status: true, duration: '10', industry: null, customer: null},
      {id: 2, name: 'Project2', description: 'Longer Description.', status: false, duration: '12', industry: null, customer: null}
    ];
    this.createSupervisorsLabels();
    this.createProjectsLabels();
  }

  getAllEmployees() {
    this.employeeArray = [
      // tslint:disable-next-line:max-line-length
      {id: 1, firstName: 'Matyas', lastName: 'Buzogany', username: 'matyi', email: 'matyasbuzogany@gmail.com', isAdmin: true, projectIds: [1, 2], supervisor: this.supervisorTest },
      {id: 2, firstName: 'Feri', lastName: 'Nagy', username: 'ferike', email: 'ferike@gmail.com', isAdmin: true, projectIds: [1], supervisor: this.supervisorTest}
    ];
  }

  cloneEmployee(employee: User): User {
    const empl = Object.assign({}, employee);
    return empl;
  }

  showDialogToAdd() {
    this.newEmployee = true;
    this.employee = {id: 1, firstName: '', lastName: '', username: '', email: '', isAdmin: true, projectIds: null, supervisor: null};
    this.displayDialog = true;
    this.selectedEmployee = {id: 1, firstName: '', lastName: '', username: '', email: '', isAdmin: true, projectIds: null, supervisor: null};
  }

  onRowSelect(event) {
    this.employee = this.cloneEmployee(event.data);
    this.newEmployee = false;
    this.displayDialog = true;
  }

  private createSupervisorsLabels() {
    this.supervisorsNamesForDropdown = [{label: 'No supervisor', value: null}];
    for (let i = 0; i < this.supervisors.length; i++) {
      this.supervisorsNamesForDropdown.push({label: this.supervisors[i].username, value: this.supervisors[i].username});
    }
  }

  private createProjectsLabels() {
    this.projectsNameForDropdown = [{label: 'No project', value: null}];
    for (let i = 0; i < this.projects.length; i++) {
      this.projectsNameForDropdown.push({label: this.projects[i].id.toString(), value: this.projects[i].id});
    }
  }

  save() {
    const employees = [...this.employeeArray];
    if (this.newEmployee) {
      employees.push(this.employee);
    } else {
      employees[this.employeeArray.indexOf(this.selectedEmployee)] = this.employee;
    }

    this.employeeArray = employees;
    this.employee = {id: 1, firstName: '', lastName: '', username: '', email: '', isAdmin: true, projectIds: null, supervisor: null};
    this.displayDialog = false;
  }

}
