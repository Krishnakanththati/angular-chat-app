import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userList = [
    { name: 'Krishna kanth', userId: 1 },
    { name: 'John David', userId: 2 },
    { name: 'Ayhan', userId: 3 },
  ];
  selectedUser = '';
  loginUserData: any;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {

  }

  selected(e: any) {
    console.log(this.selectedUser);
    this.loginUserData = this.userList.find(item => item.userId === Number(this.selectedUser));
    this.chatService.loginUser = Number(this.selectedUser);
  }

}
