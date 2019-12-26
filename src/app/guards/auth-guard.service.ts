import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {

    }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('val' + this.authService.loggedInGetter());
    if (this.authService.loggedInGetter() === true) {
            return true;
        }

    // navigate to the login page
        this.router.navigate(['/login']);

        return false;
    }
}
