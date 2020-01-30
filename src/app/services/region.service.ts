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
    return this.backendService.get('');
  }

  public insertRegion(region: Region) {
    this.backendService.post('', region);
  }

  public editRegion(region: Region) {
    this.backendService.put('', region);
  }
}
