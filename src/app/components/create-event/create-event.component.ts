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
    this.generalInfoForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      type: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      datetime: this.formBuilder.group({
        occurence: ['', Validators.required],
        occurence_date: ['', Validators.required],
        occurence_start_date: ['', Validators.required],
        occurence_end_date: ['', Validators.required],
        start_time: ['', Validators.required],
        end_time: ['', Validators.required]
      })
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
          // console.log(event);
          this.updateEvent = event;
          this.titleService.setTitle(event.title);
          
          // Set values in the form for update
          this.updateForm(event);
        });
      }
      else {
        this.titleService.setTitle("Create Event");
      }
    });
  }

  setCategory(event: any): void {
    this.generalInfoForm.patchValue({
      category: event.category,
      subcategory: event.subcategory
    });
  }

  setType(type: any): void {
    this.generalInfoForm.patchValue({type:type});
  }

  setDate(datetime: any): void {
    // console.log(datetime);
    this.generalInfoForm.patchValue({
      datetime: {
        occurence: datetime.occurence,
        occurence_date: datetime.occurence_date,
        occurence_start_date: datetime.occurence_start_date,
        occurence_end_date: datetime.occurence_end_date,
        start_time: datetime.start_time,
        end_time: datetime.end_time,
      }
    });
  }

  test() {
    console.log(this.generalInfoForm.value);
  }

  updateForm(event: any): void {
    this.generalInfoForm.patchValue({
      title:event.title,
      description: event.description,
    });
    this.setCategory(event);
    this.setType(event.type);
    this.setDate(event.datetime);
  }

}
