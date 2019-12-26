import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit{
    loggedInUser: string;

    /**in terminal run: npm install ngx-cookie-service --save
     *                  npm install ngx-toastr --save
     *                  npm install @angular/animations --save
     * **/
    constructor(private router: Router, private cookieService: CookieService, private toastrService: ToastrService) {
    }

    ngOnInit (){
        this.loggedInUser = this.cookieService.get("username");
    }

    logout() {
        console.log('You ve been logout');
        this.router.navigate(['/login']);
    }

}
