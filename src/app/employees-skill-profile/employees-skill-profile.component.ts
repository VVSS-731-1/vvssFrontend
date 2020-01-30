import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {SkillService} from '../services/skill.service';
import {Skill} from '../models/skill.model';
import {SkillArea} from '../models/skill-area.model';

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
  skillProfilesArray: Skill[];
  skillAreasArray: SkillArea[];
  loggedInUser: string;
  skill: Skill;
  newSkill: boolean;
  displayDialog: boolean;
  selectedSkill: Skill;

  ngOnInit(): void {

    this.getAllSkillProfiles();
    this.cols = [
      {field: 'id', header: 'ID', width: '150px'},
      {field: 'skillname', header: 'Skill Name', width: '150px'},
      {field: 'skillstatus', header: 'Skill Status', width: '150px'},
      {field: 'skillarea', header: 'Skill Area', width: '150px'},
      {field: 'level', header: 'Level', width: '150px'}
    ];

    this.loggedInUser = this.cookieService.get('username');
  }

  getAllSkillProfiles() {
    this.skillProfilesArray = [
      {id: 1, name: 'Skill1', status: true, skillAreas: null},
      {id: 2, name: 'Skill2', status: false, skillAreas: null}
    ];
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
    this.skill = {id: 1, name: '', status: true, skillAreas: null};
    this.displayDialog = true;
    this.selectedSkill = {id: null, name: '', status: true, skillAreas: null};
  }

  save() {
    const skills = [...this.skillProfilesArray];
    if (this.newSkill) {
      skills.push(this.skill);
    } else {
      skills[this.skillProfilesArray.indexOf(this.selectedSkill)] = this.skill;
    }

    this.skillProfilesArray = skills;
    this.skill = {id: 1, name: '', status: true, skillAreas: null};
    this.displayDialog = false;
  }
}
