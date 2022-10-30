import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
    @Input() title: string;
    @Output() closeEvent = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onCloseClicked() {
        this.closeEvent.emit(null);
    }
}
