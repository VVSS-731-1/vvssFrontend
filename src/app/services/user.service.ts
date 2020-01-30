import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService, private cookieService: CookieService) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.backendService.get('http://localhost:8080/user/getall');
  }

  public getAUser(id: number): Observable<User> {
    return this.backendService.get('http://localhost:8080/user/getbyid/' + id);
  }

  public getUserAfterUsername(name: string): Observable<User> {
    return this.backendService.get('http://localhost:8080/user/getbyname/' + name);
  }

  public editUser(user: User) {
    return this.backendService.post('http://localhost:8080/user/update/', user);
  }

}
