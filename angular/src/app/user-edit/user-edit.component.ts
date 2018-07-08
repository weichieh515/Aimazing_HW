import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  isEditing: Boolean;
  id: string;
  user: User;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.getUser();
        this.isEditing = true;
      }
      else {
        this.user = { name: '', gender: '', birthdate: new Date("yyyy-mm-dd") }
      }
    });

  }

  getUser(): void {
    this.userService.getById(this.id)
      .subscribe(user => {
        this.user = user;
      });
  }

  addUser(): void {
    this.userService.add(this.user)
      .subscribe(user => {
        this.user = user;
        this.returnToList();
      });
  }

  updateUser(): void {
    this.userService.update(this.id, this.user)
      .subscribe(user => {
        this.user = user;
        this.returnToList();
      });

  }

  deleteUser(): void {
    this.userService.delete(this.id)
      .subscribe(user => this.user = user);
    this.returnToList();
  }

  
  onDateChange(date: string) {
    this.user.birthdate = new Date(date);
  }
  
  private returnToList(): void {
    this.router.navigate(['/']);
  }

}
