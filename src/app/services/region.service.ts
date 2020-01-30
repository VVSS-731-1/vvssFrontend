import {Injectable} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Region} from '../models/region.model';

@Injectable({
  providedIn: 'root'
})

export class RegionService {
  constructor(private backendService: BackendService) {
  }

  public getAllRegions(): Observable<Region[]> {
    return this.backendService.get('http://localhost:8080/region/getall');
  }

  public insertRegion(region: Region) {
    return this.backendService.post('http://localhost:8080/region/add', region);
  }

  public editRegion(region: Region) {
    return this.backendService.post('http://localhost:8080/region/update', region);
  }

  deleteProject(region: Region) {
    return this.backendService.post('http://localhost:8080/region/deactivate/', region);
  }
}
