import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private backendService: BackendService) {
  }

  public getAllEmployees(): Observable<User[]> {
    return this.backendService.get('');
  }

  public insertEmployee(user: User) {
    this.backendService.post('', user);
  }

  public editEmployee(user: User) {
    this.backendService.put('', user);
  }

  public getAllProjectIds(): Observable<number> {
    return this.backendService.get('');
  }

  public getSupervisor(user: User): Observable<User> {
    return this.backendService.get('', user);
  }
}
