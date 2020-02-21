import { Component, OnInit } from '@angular/core';
import { EditorService } from './editor.service';
import { User } from './models/user';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private users: User[];
  private editorService;

  constructor(editorService: EditorService) {
    this.editorService = editorService;
  }

  ngOnInit(): void {
    this.editorService.getUsers().subscribe({
      next: users => this.users = users
    })
  }

}
