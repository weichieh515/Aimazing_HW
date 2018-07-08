import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user';

const userUrl = 'http://localhost:5000/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `bearer ${this.getToken().token}` })
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(userUrl, this.httpOptions)
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${userUrl}/${id}`, this.httpOptions)
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(userUrl, user, this.httpOptions)
  }

  update(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${userUrl}/${id}`, user , this.httpOptions)
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${userUrl}/${id}`, this.httpOptions)
  }

  private getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
}
