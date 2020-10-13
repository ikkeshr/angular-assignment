import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showPlaceholder: boolean = true;

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Event");
  }

  public routerActivate(event: any): void {
    // console.log(event);
    this.showPlaceholder = false;
  }

  public routerDeactivate(event: any): void {
    // console.log(event);
    this.showPlaceholder = true;
    this.titleService.setTitle("Event");
  }

}
