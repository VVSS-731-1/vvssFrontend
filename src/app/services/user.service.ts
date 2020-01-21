import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.backendService.get('');
  }

  public getAUser(id: number): Observable<User> {
    return this.backendService.get('/' + id);
  }
}
