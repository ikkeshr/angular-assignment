import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  eventList: any;

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventService.loadEvents().subscribe(events => {
      // console.log(events);
      this.eventList = events;
    });
  }

}
