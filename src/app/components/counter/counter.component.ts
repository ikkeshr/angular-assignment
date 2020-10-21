import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input('max') max: number;
  @Input('min') min: number = 0;
  @Input('default') counter: number = 0;
  @Output('onChange') emitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  increment(): void {
    if (this.counter+1 <= this.max || !this.max) {
      this.counter++;
      this.emitter.emit(this.counter);
    }
  }

  decrement(): void {
    if (this.counter-1 >= this.min) {
      this.counter--;
      this.emitter.emit(this.counter);
    }
  }

}
