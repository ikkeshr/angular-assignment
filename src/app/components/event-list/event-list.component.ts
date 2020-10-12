import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  eventList: any;
  eventIdxActive: number = -1;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventService.loadEvents().subscribe(events => {
      console.log(events);
      this.eventList = events;
    });
  }

  public selectEvent(index: number, eventId: number): void {
    // console.log("selected event " + index + ", " + eventId);
    this.eventIdxActive = index;
  }

}
