import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {

  @Input('eventData') eventData: any;

  additionalInfoForm: FormGroup;
  formSubmitted: boolean = false;

  openMatExapandPanel: boolean = true;

  restrictions: string[] = ["None", "Children Only", "Women Only", "No Children", "Event 18 +", "Senior Citizen"];
  authorities: string[] = ["Police", "Fire Department", "Traffic Control"];

  showAuthoritiesPanel: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // console.log("ngInit " + this.openMatExapandPanel);
    this.initForm();
  }

  initForm(): void {
    this.additionalInfoForm = this.formBuilder.group({
      restrictions: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
      attendance_count: 0,
      special_guests: this.formBuilder.group({
        names: this.formBuilder.array([]),
        pictures: this.formBuilder.array([]),
        additional_info: ''
      }),
      authorities_notified: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnChanges(): void {
    if (this.eventData) {
      console.log(this.eventData);

      // Fill in restrictions data in form
      const restrictionFormArray = this.additionalInfoForm.get("restrictions") as FormArray;
      restrictionFormArray.clear();
      this.eventData.restrictions.forEach(r => {
        restrictionFormArray.push(this.formBuilder.control(r));
      });

      // Set attendance count in form
      this.changeAttendanceCount(this.eventData.attendance_count);

      //Fill in special guest names data in form
      const specialGuestsNameFormArray = this.additionalInfoForm.get('special_guests').get('names') as FormArray;
      specialGuestsNameFormArray.clear();
      this.eventData.special_guests.names.forEach(sg => {
        specialGuestsNameFormArray.push(this.formBuilder.control(sg, Validators.required));
      });

      // Open panel to show guest names if any
      this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
      // this.cdRef.detectChanges();

      // Fill in special guests pictures in form
      this.setGuestImages(this.eventData.special_guests.pictures);

      // Fill in authorities notifies in form
      const authorityNotifiedFormArray: FormArray =  this.additionalInfoForm.get('authorities_notified') as FormArray;
      authorityNotifiedFormArray.clear();
      this.eventData.authorities_notified.forEach(a => {
        this.showAuthoritiesPanel = true;
        authorityNotifiedFormArray.push(this.formBuilder.control(a));
      });

    }
    // console.log("ng changes " + this.openMatExapandPanel);
    
  }

  ngAfterViewInit(): void {
    this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
    // this.cdRef.detectChanges();
    // console.log("ngafter: " + this.openMatExapandPanel);
  }


  restrictionAdded(restriction): boolean {
    return this.additionalInfoForm.get('restrictions').value.find(r => r===restriction);
  }

  AddOrRemoveRestriction(restriction): void {
    const restrictionFormArray = this.additionalInfoForm.get("restrictions") as FormArray;
    const restrictionAlreadyAddedIdx = restrictionFormArray.value.findIndex(r => r===restriction);
    if (restrictionAlreadyAddedIdx < 0) {
      restrictionFormArray.push(this.formBuilder.control(restriction));
    } else {
      restrictionFormArray.removeAt(restrictionAlreadyAddedIdx);
    }
  }

  changeAttendanceCount(count: number): void {
    this.additionalInfoForm.get('attendance_count').patchValue(count);
  }

  changeSpecialGuestChange(count: number): void {
    const specialGuestsNameFormArray = this.additionalInfoForm.get('special_guests').get('names') as FormArray; 
    const actualSpecialGuestCount: number = specialGuestsNameFormArray.value.length;
    
    if (count < actualSpecialGuestCount) {
      specialGuestsNameFormArray.removeAt(actualSpecialGuestCount-1);
    }
    else if (count > actualSpecialGuestCount) {
      specialGuestsNameFormArray.push(this.formBuilder.control("", Validators.required));
    }

    this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
  }

  setGuestImages(pictures: string[]): void {
    const specialGuestsPicturesFormArray = this.additionalInfoForm.get('special_guests').get('pictures') as FormArray;
    specialGuestsPicturesFormArray.clear();
    pictures.forEach(p => specialGuestsPicturesFormArray.push(this.formBuilder.control(p)));
  }

  authorityAdded(authority: string): boolean {
    return this.additionalInfoForm.get('authorities_notified').value.find(a => a===authority);
  }

  AddOrRemoveAuthority(authority: string): void {
    const authorityNotifiedFormArray: FormArray =  this.additionalInfoForm.get('authorities_notified') as FormArray;
    const authorityAlreadyAddedIdx: number = authorityNotifiedFormArray.value.findIndex(a => a===authority);
    
    if (authorityAlreadyAddedIdx < 0) {
      authorityNotifiedFormArray.push(this.formBuilder.control(authority));
    } else {
      authorityNotifiedFormArray.removeAt(authorityAlreadyAddedIdx);
    }
  }

  toggleAuthoritiesNotified(decision: string): void {
    if (decision === "Yes")
      this.showAuthoritiesPanel = true;
    else {
      this.showAuthoritiesPanel = false;
      (this.additionalInfoForm.get('authorities_notified') as FormArray).clear();
    }
      
  }

  authoritiesValid(): boolean {
    return (this.showAuthoritiesPanel 
              && this.additionalInfoForm.get('authorities_notified').value.length < 1 
              && this.formSubmitted);
  }

  submit(): void {
    this.formSubmitted = true;
    console.log(this.additionalInfoForm);
  }

}
