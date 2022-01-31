import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChatService {

    myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:3000/messages');

    messageSubject = new Subject<any[]>();
    _messages: any = [];

    _connected = false;
    constructor(
        private http: HttpClient
    ) {}

    getMessages() {
        this.http.get('messages').subscribe((res: any) => {
            this._messages = res;
            this.messageSubject.next(this._messages);
        });

        this.connectToChat();
        return this.messageSubject.asObservable();
    }

    sendMessage($event: any) {
        this.myWebSocket.next($event);
    }

    connectToChat() {
        if (this._connected) return;

        this.myWebSocket.asObservable().subscribe((dataFromServer: any) => {
            console.log(dataFromServer);
            this._messages.push({user_id: dataFromServer.user, message: dataFromServer.content});
            this.messageSubject.next(this._messages);
        });

        this._connected = true;
    }
}