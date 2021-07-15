import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  currentUser: any;
  loginID: any;
  inputText = '';
  constructor(
    private socketSvc: SocketService,
    private chatService: ChatService
  ) {
    this.loginID = this.chatService.loginUser;
  }

  ngOnInit(): void {
    this.chatService.chatUserChanged.subscribe(res => {
      this.currentUser = res;
      setTimeout(() => {
        const scrollEle = document.querySelector('.chat-container .chat-body');
        if (scrollEle) {
          scrollEle.scrollTop = scrollEle.scrollHeight;
        }
      }, 100);
    });
  }


  onEnter(e: any) {
    e.preventDefault();
    let messageText: string = e.target['value'];
    messageText = '' + messageText.trim();
    if (messageText) {
      this.sendMessage(messageText);
      e.target['value'] = '';
    }
  }

  sendMessage(messageText?: string) {
    let text = messageText ? messageText : this.inputText;
    const req = {
      from: Number(this.chatService.loginUser),
      to: this.currentUser.id,
      msg: text
    }
    this.inputText = '';
    this.socketSvc.emit('chat', req);
  }
}
