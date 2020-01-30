import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Login} from '../models/login.model';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login;

  constructor(private router: Router, private loginService: LoginService,
              private toastrService: ToastrService, private authService: AuthService,
              private cookieService: CookieService) {

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
        console.log(error);
        this.toastrService.error(error);
      }
     );
  }
}
