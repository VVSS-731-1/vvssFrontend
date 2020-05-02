import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Login} from '../models/login.model';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login;
  user: User;

  constructor(private router: Router, private loginService: LoginService,
              private toastrService: ToastrService, private authService: AuthService,
              private cookieService: CookieService, private userService: UserService) {

  }

  ngOnInit(): void {
    localStorage.setItem('loggedIn', 'false');
    this.cookieService.delete('username');
  }

  login(username, password) {
    this.loginCreds = {
      username: username.value,
      password: password.value
    };

    this.loginService.sendToBackendUserCredentials(this.loginCreds).subscribe(
     response => {

        console.log('response is ', response);
        this.toastrService.success('Login succesful!');

        this.router.navigate(['/home']);
        this.authService.loggedInSetter();

        if (this.loginCreds.username.indexOf('@') >= 0) {
         console.log('Email');
         this.loginCreds.username = response.username;
       }

        this.cookieService.set('username', this.loginCreds.username);
        this.cookieService.set('isAdmin', String(response.admin));
      },
     (error) => {
       this.toastrService.error('Error by login.');
       this.userService.getUserAfterUsername(this.loginCreds.username).subscribe(
         response => {
           console.log(response.username);
           if (response.counter < 3) {
             response.counter = response.counter + 1;
             this.userService.editUser(response).subscribe(
               respone2 => {
                 this.toastrService.error('Could not increase value of failed login attempts.');
               },
               (error1) => {
                 this.toastrService.success('Number of failed attempts to login increased!');
               }
             );

           } else if (response.counter === 3) {
             response.status = false;
             this.userService.editUser(response).subscribe(
               respone2 => {
                 this.toastrService.error('Could not deactivate user.');
               },
               (error2) => {
                 this.toastrService.success('Too many failed attempts. User deactivated.');
               }
             );
           }
         }
       );
      }
     );
  }
}
