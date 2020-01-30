import {Project} from './project.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  admin: boolean;
  counter: number;
  projects: Project[];
  status: boolean;
  supervisor: User;
  supervising: User[];
}
