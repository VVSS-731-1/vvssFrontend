import { Component, OnInit } from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {RegionService} from '../services/region.service';
import {Region} from '../models/region.model';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private regionService: RegionService, private cookieService: CookieService) {
  }

  regionsArray: Region[];
  cols: any[];
  region: Region;
  newRegion: boolean;
  displayDialog: boolean;
  selectedRegion: Region;

  ngOnInit(): void {
    this.getAllRegions();
    this.cols = [
      {field: 'id', header: 'Region ID', width: '150px'},
      {field: 'name', header: 'Location', width: '150px'},
      {field: 'status', header: 'Status', width: '150px'}
    ];
  }

  private getAllRegions() {
    this.regionsArray = [
      {id: 1, name: 'Cluj-Napoca', status: true},
      {id: 2, name: 'Bucharest', status: true},
      {id: 3, name: 'Targu Mures', status: true}
    ];
  }

  onRowSelect(event) {
    this.region = this.cloneRegion(event.data);
    this.newRegion = false;
    this.displayDialog = false;
  }

  private cloneRegion(region: Region) {
    const reg = Object.assign({}, region);
    return reg;
  }

  showDialogToAdd() {
    this.newRegion = true;
    this.region = {id: 1, name: '', status: true};
    this.displayDialog = true;
    this.selectedRegion = {id: null, name: '', status: true};
  }

  save() {
    const regions = [...this.regionsArray];
    if (this.newRegion) {
      regions.push(this.region);
    } else {
      regions[this.regionsArray.indexOf(this.selectedRegion)] = this.region;
    }

    this.regionsArray = regions;
    this.region = {id: null, name: '', status: true};
    this.displayDialog = false;
  }
}
