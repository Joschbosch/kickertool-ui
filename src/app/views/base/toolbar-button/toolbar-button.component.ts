import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toolbar-button',
    templateUrl: './toolbar-button.component.html',
    styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent {
    @Input() text: string;
    @Input() icon: string;
    @Input() highlighted: any;

    @Output() clicked = new EventEmitter();

    onButtonClicked() {
        this.clicked.emit(null);
    }
}
