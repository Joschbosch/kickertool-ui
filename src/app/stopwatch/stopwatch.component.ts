import { Component, OnInit } from '@angular/core';

// tslint:disable: indent
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

	stopwatchChannel = new BroadcastChannel('stopwatch');
	running = false;

  constructor() { }

  ngOnInit() {
  }

}
