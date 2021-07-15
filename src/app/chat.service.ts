import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatUserChanged = new Subject<any>();
  loginUser: any;
  constructor() { }
}
