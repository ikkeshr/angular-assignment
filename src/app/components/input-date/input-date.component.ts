import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {
  @Input('occurence') occurence = 'Monthly';
  @Input('occurence_date') occurence_date = "";
  @Output('onChange') emitter = new EventEmitter();
  @Input('start_date') start_date: string = "";
  @Input('end_date') end_date: string = "";

  occurences: any[] = [
    {
      occurence: "Monthly",
      occurence_dates: ["Every 1st day of the month", "Mid month","Last day of the month"]
    },
    {
      occurence: "Weekly",
      occurence_dates: ["Every 1st day of the week", "Weekday", "Weekend", "Last day of the week"]
    }
  ] 

  constructor() { }

  ngOnInit(): void {
  }

  getOccurenceDates(): any {
    return this.occurences.filter(item => item.occurence===this.occurence).pop().occurence_dates;
  }

  occurenceChange(event: any): void {
    this.occurence = event.value;
    this.occurence_date = "";
    this.emitValues();
  }

  occurenceDateChange(event: any): void {
    this.occurence_date = event.value;
    this.emitValues();
  }

  emitValues(): void {
    this.emitter.emit({
      occurence: this.occurence,
      occurence_date: this.occurence_date,
      start_date: this.start_date,
      end_date: this.end_date
    });
  }

  startDateChange(event: any): void {
    this.start_date = event.value.toString();
    this.emitValues();
  }

  endDateChange(event: any): void {
    this.end_date = event.value.toString();
    this.emitValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes.occurence && changes.occurence.currentValue === "") {
      this.occurence = this.occurences[0].occurence;
      this.occurence_date = this.occurences[0].occurence_dates[0];
    }
  }

}
