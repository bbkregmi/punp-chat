import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './chat-service/chat-service';

@Component({
  selector: 'punp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private chatService: ChatService
  ) {}

  message = new FormControl();

  onSubmit() {
    if (!this.message.value || !this.message.value.trim().length) {
      return;
    }

    const payload = {
      user: 'testUser',
      content: this.message.value
    };

    this.chatService.sendMessage(payload);
    this.message.reset();
  }
}
