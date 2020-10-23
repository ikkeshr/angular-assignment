import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Title } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params);
      if (params.id) {
        this.eventService.loadEventById(params.id).subscribe(event => {
          // console.log(event);
          this.updateEvent = event;
          this.titleService.setTitle(event.title);
          
        });
      }
      else {
        this.titleService.setTitle("Create Event");
      }
    });
  }

  setGeneralForm(form: FormGroup): void {
    this.generalInfoForm = form;
    console.log(this.generalInfoForm);
  }

  setPricingLocationForm(form: FormGroup): void {
    this.pricingLocationForm = form;
  }

  setAdditionalInfoForm(form: FormGroup): void {
    this.additionalInfoForm = form;
  }

}
