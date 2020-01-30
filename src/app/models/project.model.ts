import {Industry} from './industry.model';
import {Customer} from './customer.model';

export interface Project {
    id: number;
    name: string;
    description: string;
    status: boolean;
  // duration in backend is long
    duration: any;
    industry: Industry;
    customer: Customer;
  //assignedUsers: number[];
}
