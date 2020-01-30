import {Component, OnInit} from '@angular/core';
import {Profile} from '../models/profile.model';
import {ProfileService} from '../services/profile.service';
import {CookieService} from 'ngx-cookie-service';
import {SkillProfileModel} from '../models/skill-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  styles: ['kendo-pdf-export { font-family: "DejaVu Sans", "Arial", sans-serif; font-size: 12px;}']
})
export class ProfileComponent implements OnInit {
  private username: string;

  constructor(private profileService: ProfileService, private cookieService: CookieService) {

  }

  profiles: Profile[];
  index: number;
  profile: Profile;
  projects: string;
  skills: string;
  skillProfiles: SkillProfileModel[];

  ngOnInit() {
    console.log('profile');
    this.profileService.getProfile().subscribe(p => {
      console.log('Profile loaded');
      this.profiles = p;
      console.log(this.profiles);
      this.skills = '';
      this.projects = '';
      this.index = 0;

      this.username = this.cookieService.get('username');

      for (let i = 0; i < this.profiles.length; i++) {
        if (this.profiles[i].user.username == this.username) {
          this.profile = this.profiles[i];
          this.index = i + 1;
          break;
        }
      }

      this.skillProfiles = this.profiles[this.index].skillProfiles;

      for (let sIndex = 0; sIndex < this.profiles[this.index].skillProfiles.length; sIndex++) {
        this.skills += this.profiles[this.index].skillProfiles[sIndex].skill_id.name + ': '
          + this.profiles[this.index].skillProfiles[sIndex].level + '\n';
      }

      for (let pIndex = 0; pIndex < this.profile.user.projects.length; pIndex++) {
        this.projects += this.profile.user.projects[pIndex].name + '\n';
      }

      console.log(this.profile);

    }, Error => {
      alert(Error);
    });
  }
}
