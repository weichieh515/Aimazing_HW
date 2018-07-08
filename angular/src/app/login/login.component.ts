import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { Manger } from '../manger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  manger: Manger = { username: '', password: '' };
  constructor(public authServie: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authServie.login(this.manger)
      .subscribe(token => {
        this.authServie.saveToken(token);
        this.router.navigate(['/']);
      });
  }

}
