import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Profile} from "../models/profile.model";
import {ProfileService} from "../services/profile.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private profileService: ProfileService) {

  }
  profile: Profile;

  ngOnInit() {
    this.profileService.getProfile().subscribe(p => {
      console.log("Profile loaded");
    });
  }
}
