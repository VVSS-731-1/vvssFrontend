import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './guards/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';
import {EmployeesSkillProfileComponent} from './employees-skill-profile/employees-skill-profile.component';
import {ProjectsComponent} from './projects/projects.component';
import {MasterdataComponent} from './master-data/masterdata.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {EmployeesComponent} from './employees/employees.component';
import {RegionComponent} from './region/region.component';


export const routes: Routes = [
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
              path: 'employees-skill-profile',
              component: EmployeesSkillProfileComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'employees',
                component: EmployeesComponent
            },
            {
              path: 'region',
              component: RegionComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
