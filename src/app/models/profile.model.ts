import {ConsultingLevel} from './consulting-level.model';
import {User} from './user.model';

export interface Profile {
    id: number;
    consultingLevel: ConsultingLevel;
    user: User;
    image: any[];
    status: boolean;
    skillProfileIds: number[];
}
