import { Component, OnInit, NgZone } from '@angular/core';
import * as joda from 'js-joda';
import { Globals } from '../classes/globals/Globals';
import { isNumber } from 'util';

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
	initStopwatch = undefined;
	stopwatch = joda.LocalTime.of(0, 0, 0, 0);
	stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
	audio = new Audio('./../../assets/audio/timeout.wav');
	private timer;

	constructor(private zone: NgZone) { }

	ngOnInit() {
		this.stopwatchChannel.onmessage = msg => this.translateMessage(msg.data);
	}

	init(minutes: number): void {
		if (!this.running && !this.paused) {
			this.initStopwatch = joda.LocalTime.of(0, minutes, 0, 0);
			this.stopwatch = this.initStopwatch;
			this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
		}
	}

	private translateMessage(msg: any): void {

		if (isNumber(msg)) {
			this.zone.run(() => this.init(msg));
		}

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

		clearInterval(this.timer);
		this.running = true;
		this.zone.run(() =>
			this.timer = setInterval(() => {
				this.stopwatch = this.stopwatch.minusNanos(100000000);
				this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));

				if (this.stopwatchFinished(this.stopwatch)) {
					this.audio.play();
					clearInterval(this.timer);
				}
			}, 100)
		);
	}

	private stopwatchFinished(stopwatch: joda.LocalTime): boolean {
		return stopwatch.minute() === 0 && stopwatch.second() === 0 && stopwatch.nano() === 0;
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
			clearInterval(this.timer);
			this.zone.run(() => {
				this.stopwatch =  this.initStopwatch;
				this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(Globals.TIME_FORMAT));
			});
		}
	}

}
