import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlynumberDirective {

    regexStr = '^[0-9]*$';
    constructor() { }

    @Input() OnlyNumber: boolean;

    @HostListener('keydown', ['$event']) onkeydown(event: KeyboardEvent) {
        const regEx = new RegExp(this.regexStr);
        const key = event.key;

        if (key === 'Backspace') {
            return;
        }

        if (regEx.test(key)) {
            return;
        } else {
            event.preventDefault();
        }
    }

}
