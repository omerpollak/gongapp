import { Component, OnInit } from '@angular/core';
import { EditorService } from './editor.service';
import { User } from './models/user';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private editorService: EditorService;
  private authenticationService: AuthenticationService;
  public users: User[];
  public hierarchy: User[];
  public loggedUserFullName: string;
  private userId: number;

  constructor(editorService: EditorService, 
    authenticationService: AuthenticationService, 
    private router: Router) {
    this.editorService = editorService;
    this.authenticationService = authenticationService;
    this.userId = JSON.parse(localStorage.getItem('loggedUser'))['userId'];
  }

  ngOnInit(): void {
    this.editorService.getUsers().subscribe({
      next: users => {
        this.users = users.filter(user => user);
        this.hierarchy = this.editorService.getHierarchy(this.users);
        this.editorService.sendChosenUser(null);

        this.loggedUserFullName = this.getLoggedUserFullName();
      }
    })
  }

  getLoggedUserFullName(): string {
    let loggedUser = this.users.filter(user => user.id === this.userId)[0];
    if (loggedUser) {
      return `${loggedUser.firstName} ${loggedUser.lastName}`;
    } else {
      alert('no user logged in');
      return `no user logged in`;
    }
  }

  onLogOutClicked(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
