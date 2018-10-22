import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../guards/login.service';
import { CookieService } from 'ngx-cookie';
import { BackendService } from '../applicantMain/service/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BackendService]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLogged = true;
  sessionKey = 'myLogin';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieSerivce: CookieService,
  ) {}

  ngOnInit() {
    const sessionUser = this.cookieSerivce.get(this.sessionKey);
    if (sessionUser !== undefined && sessionUser !== null) {
      this.router.navigate(['applicants']);
    } else {
      this.router.navigate(['login']);
    }
  }
  onLoggingIn(form: NgForm, event: Event) {
    const value = form.value;
    this.username = value.username;
    this.password = value.password;

    this.loginService.logIn(this.username, this.password).subscribe(
      (response: any) => {
        if (response.ok === true) {
          this.isLogged = true;
          this.sessionKey = response.body.access_token;
          console.log('ssk', this.sessionKey);
          this.router.navigate(['applicants']);
        }
        if (response.ok === 'false') {
          this.isLogged = false;
          this.router.navigate(['login']);
         }
      }
    );


    // if (this.loginService.isLoggedIn(this.username, this.password)) {
    //   this.isLogged = true;
    //   this.router.navigate(['applicants']);
    // } else {
    //   this.isLogged = false;
    //   this.router.navigate(['login']);
      // wrong message
    }
  }
}
