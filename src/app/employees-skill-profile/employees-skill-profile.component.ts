import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {SkillService} from '../services/skill.service';
import {Skill} from '../models/skill.model';
import {SkillArea} from '../models/skill-area.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SkillWrapperModel} from '../models/skill-wrapper.model';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-employees',
  templateUrl: './employees-skill-profile.component.html',
  styleUrls: ['./employees-skill-profile.component.css']
})

export class EmployeesSkillProfileComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private skillService: SkillService, private cookieService: CookieService) {
  }

  cols: any[];
  skillProfilesArray: SkillWrapperModel[] = [];
  skillsArray: Skill[] = [];
  skillAreasArray: SkillArea[] = [];
  loggedInUser: string;
  skill: Skill;
  newSkill: boolean;
  displayDialog: boolean;
  selectedSkill: SkillWrapperModel;
  selectedSimpleSkill: Skill;
  skillAreaForDropdown: SelectItem[];
  skillLevelForDropdown: SelectItem[];

  ngOnInit(): void {

    this.getAllSkillProfiles();
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

  getAllSkillProfiles() {
    this.skillService.getAllSkills().subscribe(
      (response) => {
        this.skillsArray = response.filter(x => x.status === true);
        for (let i = 0; i < this.skillsArray.length; i++) {
          this.skillProfilesArray.push({
            id: this.skillsArray[i].id,
            name: this.skillsArray[i].name,
            status: this.skillsArray[i].status,
            skillArea: this.skillsArray[i].skillArea.name,
            skillLevel: 0
          });
        }
      }
    );

  }

  searchEmployees() {
    this.getAllSkillProfiles();
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
    this.displayDialog = true;
    this.selectedSkill = {id: null, name: '', status: true, skillArea: null, skillLevel: 0};
  }

  save() {
    this.selectedSimpleSkill.id = this.selectedSkill.id;
    this.selectedSimpleSkill.name = this.selectedSkill.name;
    this.selectedSimpleSkill.status = this.selectedSkill.status;
    // need to change
    this.selectedSimpleSkill.skillArea = null;
    if (this.newSkill) {
      this.skillService.insertSkill(this.selectedSimpleSkill).subscribe(
        () => {
          this.toastrService.success('Skill inserted successfully.');
          this.getAllSkillProfiles();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getAllSkillProfiles();
          } else {
            this.toastrService.error('Could not insert project!');
          }
        });
    } else {
      this.skillService.editSkill(this.selectedSimpleSkill).subscribe(
        () => {
          this.toastrService.success('Skill updated successfully.');
          this.getAllSkillProfiles();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 200) {
            this.getAllSkillProfiles();
          } else {
            this.toastrService.error('Could not update skill!');
          }
        });
    }
    this.displayDialog = false;
  }

  private createSkillAreasLabels() {
    this.skillAreaForDropdown = [{label: 'No skill area', value: null}];
    for (let i = 0; i < this.skillAreasArray.length; i++) {
      this.skillAreaForDropdown.push({label: this.skillAreasArray[i].name, value: this.skillAreasArray[i].name});
    }
  }
}
