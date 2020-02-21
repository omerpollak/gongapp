import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private url = 'https://gongfetest.firebaseio.com/';
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users.json').pipe(
      tap(data => console.log(JSON.stringify(data)))
    );
  }
}
