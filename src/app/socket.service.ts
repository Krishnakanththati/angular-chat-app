import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from "rxjs";

// const URL = 'https://messenger.wayfr.co/';
// const URL = 'http://localhost:3000/';
const URL = 'https://kk-node-chat.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  TOKEN = `type=user_token;token=eyJraWQiOiJGS1N2XC9iSFN2NXpyVXhrZUM3cGRzXC9VQTBRSEM5eDNubmhEeFdDUkVMeTg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5MjQ0OTAxNy1mYjNlLTRjNmEtODYyNC1iZDBiNjU4YzdmZGEiLCJhdWQiOiI3cXZqcGduMDYzOHM5YjduazhuOHE4Z3J0OSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6Ijc4Yzc3OGQyLWRmY2EtNDlkMy05MGRkLWQ1YWUxZTEwODQyNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI1NTY3OTYzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9oWnBwQ2F2c1YiLCJjb2duaXRvOnVzZXJuYW1lIjoiOTI0NDkwMTctZmIzZS00YzZhLTg2MjQtYmQwYjY1OGM3ZmRhIiwiZXhwIjoxNjI1NTcxNTYzLCJpYXQiOjE2MjU1Njc5NjMsImVtYWlsIjoiZ291dGhhbWJyb2tlckB0aGVqb2tlcjUuY29tIn0.mPvn6_fGQmqeU-aO9p07ve69aynLbijiy3bMXH6u2ZRHLMo8DRbPDb_Nxjr6GHtxvIk0a86flT1Nx37BE9xv8XTVhunYKfm6o5OPiXsA4N0q0zac9sYIA-pgKPDPo-LsFeavXPMHS9ec4Bg4e7YRlmvunnfdALWUf9Y1mCrAdVTqIugRc6bT9cr2KgDavo1dXLpCKo-cEI0za7JG65UfRtE49W-DuwdXAZXX6oMB23l2q5v9B5qVqz_dGYLt8JPLLU_Y1QZrlCisV4cbuCprvtsesGblkRR3gUkt4HKE5L1DF72_9u3xvKtMW3xeW5ouD17G7GdvWT0pluwp2y_vcg`;

  constructor() {
    this.socket = io(URL, {
      transports: ['websocket']
    });
  }

  listen(eventname: string) {
    let observer = new Subject<any>();
    this.socket.on(eventname, (data: any) => {
      observer.next(data);
    })
    return observer;
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
