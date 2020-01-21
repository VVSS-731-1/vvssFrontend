import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';
import {Industry} from '../models/industry.model';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private backendService: BackendService) {
  }

  public getAllProjects(): Observable<Project[]> {
    return this.backendService.get('http://localhost:8080/project/getall');
  }

  public insertProject(project: Project) {
    return this.backendService.post('', project);
  }

  public editProject(project: Project) {
    return this.backendService.put('', project);
  }

  getAllIndustries(): Observable<Industry[]> {
    return this.backendService.get('');
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.backendService.get('');
  }
}
