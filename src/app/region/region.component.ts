import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {RegionService} from '../services/region.service';
import {Region} from '../models/region.model';
import {HttpErrorResponse} from "@angular/common/http";

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
  // cols: [
  //   {
  //     field: 'RegionId'
  //     header: 'RegionId'
  //     display: 'table-cell'
  //     width:'150px'
  //   },
  //   {
  //     field: 'Name'
  //     header: 'Name'
  //     display: 'table-cell'
  //     width:'150px'
  //   },
  //   {
  //     field: 'Status'
  //     header: 'Status'
  //     display: 'none'
  //   }
  //   ];
  region: Region;
  newRegion: boolean;
  displayDialog: boolean;
  selectedRegion: Region;

  ngOnInit(): void {
    this.getAllRegions();
    this.cols = [
      {field: 'id', header: 'Region ID', width: '150px'},
      {field: 'name', header: 'Location', width: '150px'},
    ];
  }

  onRowSelect(event) {
    this.region = this.cloneRegion(event.data);
    this.newRegion = false;
    this.displayDialog = true;
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

    const idRegex = new RegExp('^[0-9]+$');

    if (!idRegex.test(this.selectedRegion.id.toString())) {
      this.toastrService.error('Invalid id.');
    }

    if(this.newRegion) {
      console.log('New Region!');
      console.log(this.selectedRegion);

      this.regionService.insertRegion(this.selectedRegion).subscribe(
        () => {
          this.toastrService.success('Region inserted!');
          this.getAllRegions();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if(error.status === 200) {
            this.getAllRegions();
          }
          else {
            this.toastrService.error('Error at region insertion!');
          }
        }
      )
    }else {
      this.regionService.editRegion(this.selectedRegion).subscribe(
        () => {
          this.toastrService.success('Region updated!');
          this.getAllRegions();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 200) {
            this.getAllRegions();
          } else {
            this.toastrService.error('Error at region update!');
          }
        }
      )
    }

    this.displayDialog = false;
  }

  getAllRegions() {
    this.regionService.getAllRegions().subscribe( (regionList) => {
      this.regionsArray = regionList.filter(x => x.status ===true);
    }
  );
  }

  delete() {
    this.regionService.deleteProject(this.selectedRegion).subscribe(
      () => {
        this.toastrService.error('Error at deleting region!');
      },
      (error1: HttpErrorResponse) => {
        this.toastrService.success('Region deleted successfully!');
        this.getAllRegions();
      }
    );
  }

}
