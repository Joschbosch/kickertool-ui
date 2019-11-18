import * as joda from 'js-joda';
import { StopwatchState } from './StopwatchState.enum';

export class Stopwatch {
    private static timeFormat = 'mm:ss.S';

    public stopwatch = joda.LocalTime.of(0, 0, 0, 0);
    public stopwatchString: string;
    public baseMinutes: number;
    private timer: any;
    private state: StopwatchState;
    private playSound: boolean;
    private audio = new Audio('./../../../assets/audio/timeout.wav');

    public constructor() { }

    public init(minutes: number, playSound: boolean) {
        this.baseMinutes = minutes;
        this.stopwatch = joda.LocalTime.of(0, this.baseMinutes, 3, 0);
        this.state = StopwatchState.INITIALIZED;
        this.playSound = playSound;
        this.updateFormattedTime();
    }

    public updateFormattedTime() {
        this.stopwatchString = this.stopwatch.format(
            joda.DateTimeFormatter.ofPattern(Stopwatch.timeFormat)
        );
    }

    public reset() {
        clearInterval(this.timer);
        this.stopwatch = joda.LocalTime.of(0, this.baseMinutes, 3, 0);
        this.state = StopwatchState.INITIALIZED;
        this.updateFormattedTime();
    }

    public start() {
        this.state = StopwatchState.RUNNING;
        this.timer = setInterval(() => {
            this.stopwatch = this.stopwatch.minusNanos(100000000);
            this.updateFormattedTime();
            if (this.isTimeAtZero(this.stopwatch)) {
                clearInterval(this.timer);
                if (this.playSound) {
                    this.audio.play();
                }
                this.state = StopwatchState.FINISHED;
            }

            if (this.isTimeAtBaseMinutes(this.stopwatch)) {
                if (this.playSound) {
                    this.audio.play();
                }
            }
        }, 100);
    }

    isTimeAtBaseMinutes(stopwatch: joda.LocalTime) {
        return (
            stopwatch.minute() === this.baseMinutes &&
            stopwatch.second() === 0 &&
            stopwatch.nano() === 0
        );
    }

    private isTimeAtZero(stopwatch: joda.LocalTime): boolean {
        return (
            stopwatch.minute() === 0 &&
            stopwatch.second() === 0 &&
            stopwatch.nano() === 0
        );
    }

    public pause() {
        clearInterval(this.timer);
        this.state = StopwatchState.PAUSED;
    }

    public isInitialized(): boolean {
        return this.state === StopwatchState.INITIALIZED;
    }

    public isRunning(): boolean {
        return this.state === StopwatchState.RUNNING;
    }

    public isPaused(): boolean {
        return this.state === StopwatchState.PAUSED;
    }

    public isFinished(): boolean {
        return this.state === StopwatchState.FINISHED;
    }

    public isUndefined(): boolean {
        return this.state === StopwatchState.UNDEFINED;
    }
}
