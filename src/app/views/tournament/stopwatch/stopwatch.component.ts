import { Component, OnInit } from '@angular/core';
import * as joda from 'js-joda';
import { StopwatchState } from './StopwatchState.enum';
import { StopwatchChannelCommands } from './StopwatchChannelCommands';

@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

    private timeFormat = 'mm:ss.S';

    baseMinutes: number;
    stopwatch = joda.LocalTime.of(0, 0, 0, 0);
    stopwatchString: string;

    private timer: any;
    private stopwatchState = StopwatchState.UNDEFINED;
    private channel = new BroadcastChannel(StopwatchChannelCommands.CHANNEL_ID);

    constructor() {}

    ngOnInit() {}

    initStopwatch(minutes: number) {
      if (this.isStateUndefined()) {
        this.baseMinutes = minutes;
        this.onResetStopwatchClicked();
      }
    }

    onResetStopwatchClicked() {
        clearInterval(this.timer);
        this.stopwatch = joda.LocalTime.of(0, this.baseMinutes, 0, 0);
        this.stopwatchState = StopwatchState.INITIALIZED;
        this.stopwatchString = this.stopwatch.format(joda.DateTimeFormatter.ofPattern(this.timeFormat));
    }

    onStartStopwatchClicked() {
        this.stopwatchState = StopwatchState.RUNNING;
        this.timer = setInterval(() => {
          this.stopwatch = this.stopwatch.minusNanos(100000000);
          this.stopwatchString = this.stopwatch.format(
              joda.DateTimeFormatter.ofPattern(this.timeFormat)
          );

          if (this.isTimeAtZero(this.stopwatch)) {
              clearInterval(this.timer);
              this.stopwatchState = StopwatchState.FINISHED;
          }
      }, 100);
    }

    private isTimeAtZero(stopwatch: joda.LocalTime): boolean {
        return (
            stopwatch.minute() === 0 &&
            stopwatch.second() === 0 &&
            stopwatch.nano() === 0
        );
    }

    onPauseStopwatchClicked() {
        clearInterval(this.timer);
        this.stopwatchState = StopwatchState.PAUSED;
    }

    isStateInitialized(): boolean {
        return this.stopwatchState === StopwatchState.INITIALIZED;
    }

    isStateRunning(): boolean {
        return this.stopwatchState === StopwatchState.RUNNING;
    }

    isStatePaused(): boolean {
        return this.stopwatchState === StopwatchState.PAUSED;
    }

    isStateFinished(): boolean {
        return this.stopwatchState === StopwatchState.FINISHED;
    }

    isStateUndefined(): boolean {
        return this.stopwatchState === StopwatchState.UNDEFINED;
    }
}
