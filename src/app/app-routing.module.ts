import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {AuthGuardService} from "@/guards/auth-guard.service";
import {ProfileComponent} from "@/profile/profile.component";
import {EmployeesComponent} from "@/employees/employees.component";
import {SkillProfileComponent} from "@/skill-profile/skill-profile.component";
import {ProjectsComponent} from "@/projects/projects.component";
import {MasterdataComponent} from "@/master-data/masterdata.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'employees',
                component: EmployeesComponent
            },
            {
                path: 'skill-profile',
                component: SkillProfileComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'masterdata',
                component: MasterdataComponent
            },
        ]
    },

    { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
