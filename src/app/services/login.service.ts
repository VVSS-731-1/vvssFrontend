import {BackendService} from '../core/backend/backend.service';
import {Login} from '../models/login.model';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {

  constructor(private backendService: BackendService) {
  }

  sendToBackendUserCredentials(loginCreds: Login): Observable<User> {
    return this.backendService.post('http://localhost:8080/user/login/', JSON.stringify(loginCreds));
  }
}
