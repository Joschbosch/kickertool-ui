import { Component, OnInit, NgZone } from '@angular/core';
import * as joda from 'js-joda';
import { StopwatchChannelCommands } from '../../../../models/Stopwatch/StopwatchChannelCommands';
import { BroadcastMessage } from 'src/app/models/BroadcastMessage';
import { Stopwatch } from 'src/app/models/Stopwatch/stopwatch';
import { TournamentChannelCommands } from 'src/app/models/Tournament/TournamentChannelCommands';

@Component({
    selector: 'app-stopwatchviewer',
    templateUrl: './stopwatchviewer.component.html',
    styleUrls: ['./stopwatchviewer.component.scss']
})
export class StopwatchviewerComponent implements OnInit {

    private channel = new BroadcastChannel(StopwatchChannelCommands.CHANNEL_ID);
    stopwatch: Stopwatch;

    constructor(private zone: NgZone) { }

    ngOnInit() {
        this.stopwatch = new Stopwatch();
        this.channel.onmessage = msg => this.doOnMessage(msg.data);
        this.channel.postMessage(new BroadcastMessage(StopwatchChannelCommands.CMD_REGISTER));
    }

    private doOnMessage(msg: BroadcastMessage) {
        if (msg.cmd === StopwatchChannelCommands.CMD_INIT) {
            this.zone.run(() => this.stopwatch.init(msg.data));
        }

        if (msg.cmd === StopwatchChannelCommands.CMD_START) {
            this.zone.run(() => this.stopwatch.start());
        }

        if (msg.cmd === StopwatchChannelCommands.CMD_PAUSE) {
            this.zone.run(() => this.stopwatch.pause());
        }

        if (msg.cmd === StopwatchChannelCommands.CMD_RESET) {
            this.zone.run(() => this.stopwatch.reset());
        }
    }

}
