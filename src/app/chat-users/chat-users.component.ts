import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketService } from '../socket.service';
interface User {
  name: string;
  id: number;
  messages?: any[]
}
@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {
  userList: User[] = [
    { name: 'Krishna kanth', id: 1, messages: [] },
    { name: 'John David', id: 2, messages: [] },
    { name: 'Ayhan', id: 3, messages: [] },
  ];
  activeUserId: any;
  loginId: number;
  constructor(
    private chatService: ChatService,
    private socketSvc: SocketService,
    private cdRef: ChangeDetectorRef
  ) { 
    this.loginId = this.chatService.loginUser;
  }

  ngOnInit(): void {
    const userId = this.chatService.loginUser;
    if (userId) {
      this.userList = this.userList.filter(item => item.id !== Number(userId));
    }
    this.userList.forEach(item => {
      item.messages = [];
    })
    this.socketSvc.listen('chat').subscribe(res => {
      console.log(res);
      this.addMessage(res);
    });
  }

  selectUser(item: any) {
    this.activeUserId = item.userId;
    this.chatService.chatUserChanged.next(item);
  }

  addMessage(msgObj: any) {
    const index = this.userList.findIndex(item => item.id === msgObj.to);
    let isAdd = false;
    if (index !== -1) {
      this.userList[index].messages?.push(msgObj);
      isAdd = true;
    } else {
      const fromIndex = this.userList.findIndex(item => item.id === msgObj.from);
      if (fromIndex !== -1) {
        this.userList[fromIndex].messages?.push(msgObj);
        isAdd = true;
      }
    }
    if (isAdd) {
      this.cdRef.detectChanges();
      setTimeout(() => {
        const scrollEle = document.querySelector('.chat-container .chat-body');
        if (scrollEle) {
          scrollEle.scrollTop = scrollEle.scrollHeight;
        }
      }, 50);
    }
  }

}
