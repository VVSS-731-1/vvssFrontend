import {Industry} from './industry.model';
import {Customer} from './customer.model';

export interface Project {
    id: number;
    name: string;
    description: string;
    status: boolean;
    duration: any;
    industry: Industry;
    customer: Customer;
}
