import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/project.model';
import {SelectItem} from 'primeng';
import {Industry} from '../models/industry.model';
import {Customer} from '../models/customer.model';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private projectService: ProjectService, private cookieService: CookieService,
              private userService: UserService) {
  }

  projectsArray: Project[] = [];
  cols: any[];
  displayDialog: boolean;
  selectedProject: Project;
  newProject: boolean;
  loggedInUser: string;
  project: Project;
  industryNamesForDropdown: SelectItem[];
  industries: Industry[];
  customersNamesForDropdown: SelectItem[];
  customers: Customer[];
  allEmpoyeesList: User[];

  ngOnInit(): void {
    this.getAllProjects();
    this.cols = [
      {field: 'id', header: 'ID', width: '150px'},
      {field: 'name', header: 'Project Name', width: '150px'},
      {field: 'description', header: 'Description', width: '150px'},
      {field: 'status', header: 'Status', width: '150px'},
      {field: 'duration', header: 'Duration', width: '150px'},
      {field: 'industry', header: 'Industry', width: '150px'},
      {field: 'customer', header: 'Customer', width: '150px'}
    ];

    this.loggedInUser = this.cookieService.get('username');
    /**
     this.projectService.getAllIndustries().subscribe( obj => {
      this.industries = obj;
      this.createIndusrtyLabels();
    });**/
    this.industries = [
      {id: 1, name: 'Industry1', description: 'Industry One Description', status: true},
      {id: 2, name: 'Industry2', description: 'Industry Two Description', status: true},
    ];
    this.createIndusrtyLabels();

    /**
     this.projectService.getAllCustomers().subscribe( obj => {
      this.customers = obj;
      this.createCustomersLabels();
    });**/
    this.customers = [
      {id: 1, name: 'CustomerOne', status: false},
      {id: 2, name: 'CustomerTwo', status: true},
      {id: 3, name: 'CustomerThree', status: true}
    ];
    this.createCustomersLabels();

    /**
     // get employees list
     this.userService.getAllUsers().subscribe( obj => {
      this.allEmpoyeesList = obj;
    });**/

    this.allEmpoyeesList = [
      {
        id: 1,
        firstName: 'Ana',
        lastName: 'Maria',
        username: 'anamaria',
        status: true,
        admin: true,
        email: 'aaa@yahoo.com',
        projects: [{
          id: 1,
          name: 'Project1',
          description: '....',
          status: true,
          duration: '10',
          industry: null,
          customer: null,
          assignedUsers: [1, 2]
        }],
        supervisor: null,
        supervising: []
      },
      {
        id: 2,
        firstName: 'Ana2',
        lastName: 'Maria',
        username: 'anamaria2',
        status: true,
        admin: true,
        email: 'aaa2@yahoo.com',
        projects: [{
          id: 1,
          name: 'Project1',
          description: '....',
          status: true,
          duration: '10',
          industry: null,
          customer: null,
          assignedUsers: [1, 2]
        }],
        supervisor: null,
        supervising: []
      },
      {
        id: 3,
        firstName: 'Ana3',
        lastName: 'Maria',
        username: 'anamaria3',
        status: true,
        admin: true,
        email: 'aaa3@yahoo.com',
        projects: [{
          id: 2,
          name: 'Project2',
          description: 'Longer Description.',
          status: false,
          duration: '12',
          industry: null,
          customer: null,
          assignedUsers: [2, 3]
        }],
        supervisor: null,
        supervising: []
      },
      {
        id: 4,
        firstName: 'Ana4',
        lastName: 'Maria',
        username: 'anamaria4',
        status: true,
        admin: true,
        email: 'aaa4@yahoo.com',
        projects: [{
          id: 2,
          name: 'Project2',
          description: 'Longer Description.',
          status: false,
          duration: '12',
          industry: null,
          customer: null,
          assignedUsers: [2, 3]
        }],
        supervisor: null,
        supervising: []
      },
    ];
  }

  getAllProjects() {
    /**
     // get all projects from db
     this.projectService.getAllProjects().subscribe(
     (projectList) => {
        this.projectsArray = projectList;
      }
     );
     **/

    this.projectsArray = [
      {id: 1, name: 'Project1', description: '....', status: true, duration: '10', industry: null, customer: null, assignedUsers: [1, 2]},
      {
        id: 2,
        name: 'Project2',
        description: 'Longer Description.',
        status: false,
        duration: '12',
        industry: null,
        customer: null,
        assignedUsers: [2, 3]
      }
    ];
  }

  onRowSelect(event) {
    this.project = this.cloneProject(event.data);
    this.newProject = false;
    this.displayDialog = true;
    // this.allAssignedEmployees = this.selectedProject.employees;
  }

  cloneProject(project: Project): Project {
    const proj = Object.assign({}, project);
    return proj;
  }

  showDialogToAdd() {
    this.newProject = true;
    this.project = {id: 1, name: '', description: '', status: true, duration: '', industry: null, customer: null, assignedUsers: []};
    this.displayDialog = true;

    this.selectedProject = {
      id: null,
      name: '',
      description: '',
      status: true,
      duration: '',
      industry: null,
      customer: null,
      assignedUsers: []
    };
  }

  save() {
    // verify if given data is correct
    const idRegex = new RegExp('^[0-9]+$');
    if (!idRegex.test(this.selectedProject.id.toString())) {
      this.toastrService.error('Invalid id.');
    }

    const projects = [...this.projectsArray];
    if (this.newProject) {
      projects.push(this.project);
      this.getAllProjects();
    } else {
      projects[this.projectsArray.indexOf(this.selectedProject)] = this.project;
    }

    this.projectsArray = projects;

    this.project = {id: null, name: '', description: '', status: true, duration: '', industry: null, customer: null, assignedUsers: []};
    this.displayDialog = false;

    /**
     this.projectService.editProject(this.selectedProject).subscribe (
     () => {
        this.toastrService.success('Project updated successfully.');
        this.getAllProjects();
      },
     (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error('Could not update project!');
      });**/
  }

  createIndusrtyLabels() {
    this.industryNamesForDropdown = [{label: 'No industry', value: null}];
    for (let i = 0; i < this.industries.length; i++) {
      this.industryNamesForDropdown.push({label: this.industries[i].name, value: this.industries[i].name});
    }
  }

  private createCustomersLabels() {
    this.customersNamesForDropdown = [{label: 'No customer', value: null}];
    for (let i = 0; i < this.customers.length; i++) {
      this.customersNamesForDropdown.push({label: this.customers[i].name, value: this.customers[i].name});
    }
  }

}
