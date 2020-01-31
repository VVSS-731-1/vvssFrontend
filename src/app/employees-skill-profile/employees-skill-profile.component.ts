import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {SkillService} from '../services/skill.service';
import {Skill} from '../models/skill.model';
import {SkillArea} from '../models/skill-area.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SkillInsertModel, SkillWrapperModel} from '../models/skill-wrapper.model';
import {SelectItem} from 'primeng';
import {ProfileService} from "../services/profile.service";
import {Profile} from "../models/profile.model";
import {SkillProfileModel} from "../models/skill-profile.model";

@Component({
  selector: 'app-employees',
  templateUrl: './employees-skill-profile.component.html',
  styleUrls: ['./employees-skill-profile.component.css']
})

export class EmployeesSkillProfileComponent implements OnInit, AfterViewInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private skillService: SkillService, private cookieService: CookieService,
              private profileService: ProfileService) {
  }

  cols: any[];
  skillProfilesArray: SkillWrapperModel[] = [];
  skillsArray: Skill[] = [];
  skillAreasArray: SkillArea[] = [];
  loggedInUser: string;
  skill: Skill;
  newSkill: boolean;
  displayDialog: boolean;
  insertDialog: boolean;
  selectedSkill: SkillWrapperModel;
  skillAreaForDropdown: SelectItem[];
  skillForDropdown: SelectItem[];
  skillLevelForDropdown: SelectItem[];
  skillInsert: SkillInsertModel;

  ngOnInit(): void {
    this.skillInsert = {skill: '', profile_id: 0, skill_level: 0};
    this.getEmployeeSkillProfile();
    this.getAllSkills();

  }

  ngAfterViewInit() {
    //this.getAllSkillProfiles();
    this.cols = [
      {field: 'id', header: 'ID', width: '150px'},
      {field: 'name', header: 'Skill Name', width: '150px'},
      {field: 'skillArea', header: 'Skill Area', width: '150px'},
      {field: 'skillLevel', header: 'Level', width: '150px'}
    ];

    this.loggedInUser = this.cookieService.get('username');
    this.skillService.getAllSkillAreas().subscribe(
      (response) => {
        this.skillAreasArray = response;
        this.createSkillAreasLabels();
      }
    );


    this.skillLevelForDropdown = [{label: '0', value: '0'}, {label: '1', value: '1'}, {label: '2', value: '2'}, {
      label: '3',
      value: '3'
    }, {label: '4', value: '4'}, {label: '5', value: '5'}];
  }

  getAllSkills() {
    this.skillService.getAllSkills().subscribe(
      (response) => {
        this.skillsArray = response.filter(x => x.status === true);
        this.createSkillLabels();
        console.log(this.skillsArray);
      }
    );

  }

  // searchEmployees() {
  //   this.getAllSkillProfiles();
  // }

  profiles: Profile[];
  index: number;
  username: string;
  skillProfiles: SkillProfileModel[];

  getEmployeeSkillProfile() {
    this.profileService.getProfile().subscribe(p => {
      console.log('Profile loaded');
      this.profiles = p;
      console.log(this.profiles);
      this.index = 0;

      this.username = this.cookieService.get('username');

      for (let i = 0; i < this.profiles.length; i++) {
        if (this.profiles[i].user.username == this.username) {
          this.index = i + 1;
          break;
        }
      }
      this.skillProfiles = this.profiles[this.index].skillProfiles;
      this.skillProfilesArray = [];
      for(let j = 0; j < this.skillProfiles.length; j++) {
        this.skillProfilesArray.push({
          id: this.skillProfiles[j].skill_id.id,
          name: this.skillProfiles[j].skill_id.name,
          status: this.skillProfiles[j].skill_id.status,
          skillArea: this.skillProfiles[j].skill_id.skillArea.name,
          skillLevel: this.skillProfiles[j].level,
        });
      }});
  }


  onRowSelect(event) {
    this.skill = this.cloneSkill(event.data);
    this.newSkill = false;
    this.displayDialog = true;
  }

  cloneSkill(skill: Skill): Skill {
    const sk = Object.assign({}, skill);
    return sk;
  }

  showDialogToAdd() {
    this.newSkill = true;
    this.skill = {id: 1, name: '', status: true, skillArea: null};
    this.insertDialog = true;
    this.skillInsert = {skill: '', profile_id: 0, skill_level: 0};
    this.selectedSkill = {id: null, name: '', status: true, skillArea: null, skillLevel: 0};
  }

  save() {
    // this.selectedSimpleSkill.id = this.selectedSkill.id;
    // this.selectedSimpleSkill.name = this.selectedSkill.name;
    // this.selectedSimpleSkill.status = this.selectedSkill.status;
    // // need to change
    // this.selectedSimpleSkill.skillArea = null;
    // this.skillInsert.skill = this.selectedSkill.name;
    this.skillInsert.profile_id = this.index + 1;
    console.log(this.skillInsert);
    // this.skillInsert.skill_level = this.selectedSkill.skillLevel;
    if (this.newSkill) {
      this.skillService.insertSkill(this.skillInsert).subscribe(
        () => {
          this.toastrService.success('Skill inserted successfully.');
          this.getEmployeeSkillProfile();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getEmployeeSkillProfile();
            console.log("Insert success");
          } else {
            this.toastrService.error('Could not insert project!');
          }
        });
    } else {
      this.skillService.editSkill(this.skillInsert).subscribe(
        () => {
          this.toastrService.success('Skill updated successfully.');
          this.getEmployeeSkillProfile();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getEmployeeSkillProfile();
          } else {
            this.toastrService.error('Could not update skill!');
          }
        });
    }
    this.insertDialog = false;
  }

  private createSkillAreasLabels() {
    this.skillAreaForDropdown = [{label: 'No skill area', value: null}];
    for (let i = 0; i < this.skillAreasArray.length; i++) {
      this.skillAreaForDropdown.push({label: this.skillAreasArray[i].name, value: this.skillAreasArray[i].name});
    }
  }


  private createSkillLabels() {
    this.skillForDropdown = [{label: 'No skill', value: null}];
    for (let i = 0; i < this.skillsArray.length; i++) {
      this.skillForDropdown.push({label: this.skillsArray[i].name, value: this.skillsArray[i].name});
    }

    console.log(this.skillForDropdown);
  }
}
