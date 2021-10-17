import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
    private formSubscription: Subscription;
    public keyUp = new Subject<KeyboardEvent>();

    constructor() {
        this.action();
    }

    ngOnInit(): void {
    }


    private action(): void {
        this.formSubscription = this.keyUp.pipe(
            map(event => (event.target as HTMLInputElement).value),
            debounceTime(1000)
        ).subscribe((data) => {
            console.log(data);
        });
    }

    public submit(): void {
        this.formSubscription.unsubscribe();
        setTimeout(() => {
            this.action();
            console.log('asdasd++++++++++');
        }, 2000);

    }


    ngOnDestroy(): void {
        this.formSubscription.unsubscribe();
    }
}
