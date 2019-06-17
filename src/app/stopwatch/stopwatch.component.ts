import { Component, OnInit, NgZone } from '@angular/core';
import * as joda from 'js-joda';
import { Globals } from '../classes/globals/Globals';

// tslint:disable: indent
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

	stopwatchChannel = new BroadcastChannel('stopwatch');
	running = false;
	paused = false;
	stopwatch = joda.LocalTime.of(0, 5, 0, 0);
	stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
	private timer;

	constructor(private zone: NgZone) { }

	ngOnInit() {
		this.stopwatchChannel.onmessage = msg => this.translateMessage(msg.data);
	}

	private translateMessage(msg: string): void {
		if (msg === 'start') {
			this.startStopwatch();
		}

		if (msg === 'pause') {
			this.pauseStopwatch();
		}

		if (msg === 'reset') {
			this.resetStopwatch();
		}
	}

	private startStopwatch(): void {

		if (this.running && !this.paused) {
			return;
		}

		this.running = true;
		this.zone.run(() =>
			this.timer = setInterval(() => {
				this.stopwatch = this.stopwatch.minusNanos(100000000);
				this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
			}, 100)
		);
	}

	private pauseStopwatch(): void {
		if (this.running) {
			clearInterval(this.timer);
			this.paused = true;
		}
	}

	private resetStopwatch(): void {
		if (this.running) {
			this.running = false;
			this.paused = false;
			this.zone.run(() => {
				this.stopwatch = joda.LocalTime.of(0, 5, 0, 0);
				this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
			});
		}
	}

}
