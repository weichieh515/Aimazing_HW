import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

const userUrl = '/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${userUrl}/list`, this.httpOptions())
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${userUrl}/${id}`, this.httpOptions())
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(userUrl, user, this.httpOptions())
  }

  update(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${userUrl}/${id}`, user, this.httpOptions())
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${userUrl}/${id}`, this.httpOptions())
  }

  private getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  private httpOptions() {
    return { headers: new HttpHeaders({ 'Authorization': `bearer ${this.getToken().token}` }) }
  }
}
