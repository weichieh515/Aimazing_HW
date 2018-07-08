import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { Manger } from '../manger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  manger: Manger = { username: '', password: '' };
  password_confirm;
  constructor(public authServie: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    if (this.manger.password != this.password_confirm) {
      alert("password does not match!");
      return;
    }
    this.authServie.register(this.manger)
      .subscribe(token => {
        this.authServie.saveToken(token);
        this.router.navigate(['/']);
      });
  }

}
