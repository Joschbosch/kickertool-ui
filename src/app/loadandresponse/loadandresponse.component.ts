import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DTO } from '../classes/responses/DTO';

@Component({
  selector: 'app-loadandresponse',
  templateUrl: './loadandresponse.component.html',
  styleUrls: ['./loadandresponse.component.css']
})
export class LoadandresponseComponent implements OnInit {

    @ViewChild('loadingSpinner', {static: false}) loadingSpinner: ElementRef;
    @ViewChild('alertMessage', {static: false}) alertMessage: ElementRef;

    errorMessage = '';

    constructor() { }

    ngOnInit() {
    }

    private showErrorMessage(newErrorMessage: string) {
        this.hideLoadingSpinner();
        this.errorMessage = newErrorMessage;
        this.alertMessage.nativeElement.style.display = 'inline-block';
    }

    hideErrorMessage() {
        this.alertMessage.nativeElement.style.display = 'none';
    }

    showLoadingSpinner(): void {
        this.loadingSpinner.nativeElement.style.display = 'inline-block';
    }

    hideLoadingSpinner(): void {
        this.loadingSpinner.nativeElement.style.display = 'none';
    }

    public checkResponse(response: DTO): boolean {

        if (response.validation && response.validation.errorMsgs.length > 0) {
            this.showErrorMessage(response.validation.errorMsgs.join('<br />'));
            return false;
        }

        return true;
    }

}
