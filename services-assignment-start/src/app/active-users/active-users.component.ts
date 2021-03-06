import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../userService.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input()
  users: string[];
  @Output()
  userSetToInactive = new EventEmitter<number>();

  constructor(private UserService: UserService) {}
  onSetToInactive(id: number) {
    // this.userSetToInactive.emit(id);
    console.log('active user', id );

        this.UserService.toDo.emit({ id: id, toActive: false });
  }
}
