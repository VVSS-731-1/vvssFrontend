import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Profile} from '../models/profile.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private backendService: BackendService, private cookieService: CookieService) {
  }

  public getAllProfiles(): Observable<Profile[]> {
    return this.backendService.get('');
  }

  public findProfile(): Observable<Profile> {
    return this.backendService.get('', this.cookieService.get('username'));
  }
}
