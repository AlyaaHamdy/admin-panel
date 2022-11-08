// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { io } from 'socket.io-client';
// @Injectable({
//   providedIn: 'root',
// })
// export class WebSocketService {
//   socket: any;
//   readonly url: string = 'ws://localhost:4000';
//   constructor() {
//     this.socket = io(this.url);
//   }

//   listen(eventName: string) {
//     return new Observable((subscriber) => {
//       this.socket.on(eventName, (data: string) => {
//         subscriber.next(data);
//       });
//     });
//   }
//   emit(eventName: string, data: any) {
//     this.socket.emit(eventName, data);
//   }
// }
