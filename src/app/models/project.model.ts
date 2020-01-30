export interface Project {
    id: number;
    name: string;
    description: string;
    status: boolean;
  // duration in backend is long
    duration: any;
  industry: string;
  customer: string;
  //assignedUsers: number[];
}
