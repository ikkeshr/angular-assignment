import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('title') eventTitle: string;
  @Input('organizer') eventOrganizer: string;
  @Input('date') eventDate: string;
  @Input('overview') eventOverview: string;
  @Input('profilepic') eventOrganizerProfilePicPath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
