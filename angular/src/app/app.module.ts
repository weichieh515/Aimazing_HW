import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuardService } from './auth-guard.service';


const appRoutes: Routes = [
  {
    path: 'user',
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-edit',
    component: UserEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserEditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
