import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  updateEvent: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params);
      if (params.id) {
        this.eventService.loadEventById(params.id).subscribe(event => {
          // console.log(event);
          this.updateEvent = event;
        });
      }
    });
  }

}
