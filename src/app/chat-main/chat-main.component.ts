import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat-service/chat-service';

@Component({
  selector: 'punp-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMainComponent implements OnInit {

  @ViewChild('container')
  containerDiv!: ElementRef<HTMLDivElement>;

  mockData: any;

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((res: any[]) => {
      this.mockData = res;
      this.cdr.detectChanges();
      if (this.containerDiv) {
        this.containerDiv.nativeElement.scrollTo(0, this.containerDiv.nativeElement.scrollHeight);
      }
    });
  }

}
