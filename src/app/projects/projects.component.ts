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
import {HttpErrorResponse} from '@angular/common/http';

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
      {field: 'duration', header: 'Duration', width: '150px'},
      {field: 'industry', header: 'Industry', width: '150px'},
      {field: 'customer', header: 'Customer', width: '150px'}
    ];

    this.loggedInUser = this.cookieService.get('username');

    this.projectService.getAllIndustries().subscribe(obj => {
      this.industries = obj;
      this.createIndusrtyLabels();
    });

    this.projectService.getAllCustomers().subscribe(obj => {
      this.customers = obj;
      this.createCustomersLabels();
    });

  }

  getAllProjects() {
     // get all projects from db
     this.projectService.getAllProjects().subscribe(
     (projectList) => {
       this.projectsArray = projectList.filter(x => x.status === true);
      }
     );
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
    // this.project = {id: 1, name: '', description: '', status: true, duration: '', industry: null, customer: null}; // , assignedUsers: []};
    this.displayDialog = true;

    this.selectedProject = {
      id: null,
      name: '',
      description: '',
      status: true,
      duration: '',
      industry: null,
      customer: null // , assignedUsers: []
    };
  }

  delete() {
    this.projectService.deleteProject(this.selectedProject).subscribe(
      () => {
        this.toastrService.error('Error at deleting project!');
      },
      (error1: HttpErrorResponse) => {
        this.toastrService.success('Project deleted successfully!');
        this.getAllProjects();
      }
    );
  }

  save() {
    // verify if given data is correct
    const idRegex = new RegExp('^[0-9]+$');
    if (!idRegex.test(this.selectedProject.id.toString())) {
      this.toastrService.error('Invalid id.');
    }

    if (this.newProject) {
      console.log('New project!');
      console.log(this.selectedProject.industry);
      // search for indusrty and customer
      this.projectService.insertProject(this.selectedProject).subscribe(
        () => {
          this.toastrService.success('Project inserted successfully.');
          this.getAllProjects();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getAllProjects();
            this.toastrService.success('Project inserted successfully.');
          } else {
            this.toastrService.error('Could not insert project!');
          }
        });
    } else {
      this.projectService.editProject(this.selectedProject).subscribe(
        () => {
          this.toastrService.success('Project updated successfully.');
          this.getAllProjects();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getAllProjects();
            this.toastrService.success('Project updated successfully.');

          } else {
            this.toastrService.error('Could not insert project!');
          }
        });
    }


    this.displayDialog = false;
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
