import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {
  @Input() user: User;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {}

  onUserClicked($event, clickedUser): void {
    this.editorService.sendChosenUser(clickedUser);
  }

}
