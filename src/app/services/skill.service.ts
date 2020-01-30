import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {Skill} from '../models/skill.model';
import {SkillArea} from '../models/skill-area.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private backendService: BackendService) {
  }

  public getAllSkills(): Observable<Skill[]> {
    return this.backendService.get('');
  }

  public insertSkill(skill: Skill) {
    this.backendService.post('', skill);
  }

  public editSkill(skill: Skill) {
    this.backendService.put('', skill);
  }

  getAllSkillAreas(): Observable<SkillArea[]> {
    return this.backendService.get('');
  }

  getAllSkillProfiles(): Observable<Skill[]> {
    return this.backendService.get('');
  }

}
