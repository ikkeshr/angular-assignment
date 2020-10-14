import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  updateEvent: any;

  generalInfoForm: FormGroup;
  pricingLocationForm: FormGroup;
  additionalInfoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
    this.generalInfoForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required]
    });
    this.pricingLocationForm = this.formBuilder.group({
      price: ['', Validators.required]
    });
    this.additionalInfoForm = this.formBuilder.group({
      restrictions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params);
      if (params.id) {
        this.eventService.loadEventById(params.id).subscribe(event => {
          console.log(event);
          this.updateEvent = event;
          this.titleService.setTitle(event.title);
          this.setCategory(event);
        });
      }
      else {
        this.titleService.setTitle("Create Event");
      }
    });
  }

  setCategory(event: any): void {
    this.generalInfoForm.setValue({
      category: event.category,
      subcategory: event.subcategory
    });
  }

  test() {
    console.log(this.generalInfoForm.value);
  }

}
