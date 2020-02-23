import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://gongfetest.firebaseio.com/users.json').pipe(
      // tap(data => console.log(JSON.stringify(data)))
    );
  }

  getHierarchy(users: User[]): User[] {    
    let usersByKey = {}
    users.forEach(function(user) {
      usersByKey[user.id] = user;
    });
    
    let hierarchy = [];
    Object.keys(usersByKey).forEach((id) => {
        let user = usersByKey[id]
        if (!user.managerId || user.managerId === null) {
          hierarchy.push(user)
        } else if (user.managerId in usersByKey) {
            let p = usersByKey[user.managerId]
            if (!('teamMembers' in p)) {
                p.teamMembers = [];
            }
            p.teamMembers.push(user)
            p.teamMembers = p.teamMembers.sort(this.alphabeticalSort);
        }
    });
    hierarchy = hierarchy.sort(this.alphabeticalSort);
    return hierarchy;
  }

  alphabeticalSort = (u1, u2) => u1.firstName > u2.firstName ? 1 : -1;

  sendChosenUser(chosenUser: User) {
    this.subject.next(chosenUser);
  }  
 
  getChosenUser(): Observable<User> {
    return this.subject.asObservable();
  }

}
