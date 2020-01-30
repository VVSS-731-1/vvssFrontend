import {SkillArea} from './skill-area.model';

export interface Skill {
    id: number;
    name: string;
    status: boolean;
    skillAreas: SkillArea;
}
