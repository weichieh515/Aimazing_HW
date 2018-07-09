import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Manger } from './manger';
import { Token } from './token';

const baseUrl = '';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(manger: Manger): Observable<Token> {
    return this.http.post<Token>(`${baseUrl}/login`, manger)
  }

  register(manger: Manger): Observable<Token> {
    return this.http.post<Token>(`${baseUrl}/register`, manger)
  }

  saveToken(token: Token){
    localStorage.setItem('token', JSON.stringify(token));
  }

  isLoggedIn(): boolean {
    if(!this.getToken()) return false;
    return this.getToken().exp > Date.now();
  }

  private getToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }
}
