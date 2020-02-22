import { Component, OnInit } from '@angular/core';
import { EditorService } from './editor.service';
import { User } from './models/user';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private editorService;
  public users: User[];
  public hierarchy: User[];
  public chosenUser: User;

  constructor(editorService: EditorService) {
    this.editorService = editorService;
  }

  ngOnInit(): void {
    this.editorService.getUsers().subscribe({
      next: users => {
        this.users = users.filter(user => user);
        this.hierarchy = this.editorService.getHierarchy(this.users);
        this.editorService.setChosenUser = this.hierarchy[0];
      }
    })
  }

}
