import {Skill} from './skill.model';
import {Profile} from './profile.model';

export interface SkillProfileModel {
  skill_id: Skill;
  profile_id: Profile;
  level: number;
}
