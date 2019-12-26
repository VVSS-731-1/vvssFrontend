import {ConsultingLevel} from "@/models/consulting-level.model";
import {User} from "@/models/user.model";

export interface Profile {
    id: number;
    consultingLevel: ConsultingLevel;
    user: User;
    image: any[];
    status: boolean;
    skillProfileIds: number[];
}
