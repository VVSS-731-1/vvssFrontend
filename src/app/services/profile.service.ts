import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Profile} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private backendService: BackendService) {
  }

  public getAllProfiles(): Observable<Profile[]> {
    return this.backendService.get('');
  }
}
