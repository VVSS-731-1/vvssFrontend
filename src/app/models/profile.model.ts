import {ConsultingLevel} from './consulting-level.model';
import {User} from './user.model';
import {SkillProfileModel} from './skill-profile.model';
import {Region} from './region.model';

export interface Profile {
  id: number;
  killProfiles: SkillProfileModel[];
  region: Region;
  consultingLevel: ConsultingLevel;
  user: User;
  image: any[];
  status: boolean;
}
