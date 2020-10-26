import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

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
    private cdr: ChangeDetectorRef
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
    setTimeout(() => this.generalInfoForm = form, 100);
    // this.generalInfoForm = form;
    // this.cdr.detectChanges();
    // console.log(this.generalInfoForm);
  }

  setPricingLocationForm(form: FormGroup): void {
    // this.pricingLocationForm = form;
    setTimeout(() => this.pricingLocationForm = form, 100);
  }

  setAdditionalInfoForm(form: FormGroup): void {
    // this.additionalInfoForm = form;
    setTimeout(() => this.additionalInfoForm = form, 100);
  }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  //   console.log(this.generalInfoForm);
  // }

  // ngAfterContentChecked() {
  //   console.log("ngAfterContentChecked");
  //   console.log(this.generalInfoForm);
  // }

}
