import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';

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
}
