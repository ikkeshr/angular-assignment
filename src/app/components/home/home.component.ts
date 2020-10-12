import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showPlaceholder: boolean = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  public routerActivate(event: any): void {
    // console.log(event);
    this.showPlaceholder = false;
  }

  public routerDeactivate(event: any): void {
    // console.log(event);
    this.showPlaceholder = true;
  }

}
