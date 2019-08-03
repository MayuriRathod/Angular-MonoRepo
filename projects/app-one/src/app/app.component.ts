import { Component, OnInit } from '@angular/core';
import { SharedService } from 'shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-one';

  constructor(private service: SharedService) {}

  ngOnInit() {
    this.service.dummyFunction();
  }
}
