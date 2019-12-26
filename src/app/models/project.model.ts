import {Industry} from "@/models/industry.model";
import {Customer} from "@/models/customer.model";

export interface Project {
    id: number;
    name: string;
    description: string;
    status: boolean;
    duration: any;
    industry: Industry;
    customer: Customer;
}
