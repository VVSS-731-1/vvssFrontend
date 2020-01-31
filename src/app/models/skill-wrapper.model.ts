export interface SkillWrapperModel {
  id: number;
  name: string;
  status: boolean;
  skillArea: string;
  skillLevel: number;
}

export interface SkillInsertModel {
  skill: string;
  profile_id: number;
  skill_level: number;
}
