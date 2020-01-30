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
    return this.backendService.get('http://localhost:8080/skill/getall');
  }

  public insertSkill(skill: Skill) {
    return this.backendService.post('http://localhost:8080/skill/add', skill);
  }

  public editSkill(skill: Skill) {
    return this.backendService.post('http://localhost:8080/skill/update', skill);
  }

  getAllSkillAreas(): Observable<SkillArea[]> {
    return this.backendService.get('http://localhost:8080/skillArea/getall');
  }

  getAllSkillProfiles(): Observable<Skill[]> {
    return this.backendService.get('');
  }

}
