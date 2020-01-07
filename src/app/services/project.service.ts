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
    return this.backendService.get('');
  }

  public insertProject(project: Project) {
    this.backendService.post('', project);
  }

  public editProject(project: Project) {
    this.backendService.put('', project);
  }

  getAllIndustries(): Observable<Industry[]> {
    return this.backendService.get('');
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.backendService.get('');
  }
}
