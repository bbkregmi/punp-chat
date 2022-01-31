import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main.component';



@NgModule({
  declarations: [
    ChatMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChatMainComponent,
  ]
})
export class ChatMainModule { }
