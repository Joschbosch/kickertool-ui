import { Component, OnInit, NgZone } from '@angular/core';
import * as joda from 'js-joda';
import { StopwatchChannelCommands } from '../../stopwatch/StopwatchChannelCommands';

@Component({
    selector: 'app-stopwatchviewer',
    templateUrl: './stopwatchviewer.component.html',
    styleUrls: ['./stopwatchviewer.component.scss']
})
export class StopwatchviewerComponent implements OnInit {

    private timeFormat = 'mm:ss.S';
    channel = new BroadcastChannel(StopwatchChannelCommands.CHANNEL_ID);

    baseMinutes: number;
    stopwatch = joda.LocalTime.of(0, 0, 0, 0);
    stopwatchString: string;

    private timer: any;

    constructor(private zone: NgZone) { }

    ngOnInit() {
    }

}
