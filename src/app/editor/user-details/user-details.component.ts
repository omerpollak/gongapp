import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { EditorService } from '../editor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public chosenUser: User;
  private editorService;
  private subscription: Subscription;

  
  constructor(editorService: EditorService) {    
    this.editorService = editorService;
  }

  ngOnInit(): void {
    this.subscription = this.editorService.getChosenUser().subscribe((chosenUser: User) => {
      this.chosenUser = chosenUser;
    });
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
