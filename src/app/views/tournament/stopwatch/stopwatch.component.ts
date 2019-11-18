import { Component, OnInit } from '@angular/core';
import * as joda from 'js-joda';
import { StopwatchState } from '../../../models/Stopwatch/StopwatchState.enum';
import { StopwatchChannelCommands } from '../../../models/Stopwatch/StopwatchChannelCommands';
import { BroadcastMessage } from 'src/app/models/BroadcastMessage';
import { Stopwatch } from 'src/app/models/Stopwatch/stopwatch';
import { TournamentChannelCommands } from 'src/app/models/Tournament/TournamentChannelCommands';

@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

    private channel = new BroadcastChannel(StopwatchChannelCommands.CHANNEL_ID);
    private tournamentChannel = new BroadcastChannel(TournamentChannelCommands.CHANNEL_ID);

    stopwatch: Stopwatch;

    constructor() {}

    ngOnInit() {
        this.channel.onmessage = msg => this.doOnMessage(msg.data);
        this.stopwatch = new Stopwatch();
    }

    private doOnMessage(msg: BroadcastMessage) {
        if (msg.cmd === StopwatchChannelCommands.CMD_REGISTER) {
            this.channel.postMessage(
                new BroadcastMessage(
                    StopwatchChannelCommands.CMD_INIT,
                    this.stopwatch.baseMinutes
                )
            );
        }
    }

    initStopwatch(minutes: number) {
        this.stopwatch.init(minutes, true);
    }

    onResetStopwatchClicked() {
        this.stopwatch.reset();
        this.channel.postMessage(new BroadcastMessage(StopwatchChannelCommands.CMD_RESET));
    }

    onStartStopwatchClicked() {
        this.stopwatch.start();
        this.channel.postMessage(new BroadcastMessage(StopwatchChannelCommands.CMD_START));
    }

    onPauseStopwatchClicked() {
        this.stopwatch.pause();
        this.channel.postMessage(new BroadcastMessage(StopwatchChannelCommands.CMD_PAUSE));
    }

}
