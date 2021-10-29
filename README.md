# Angular Submit Form Along with Auto-save
- **HTML**

```angular2html
<Textarea (keyup)='keyUp.next($event)'></Textarea>
<button (click) = "submit()">Submit</button>
```



- **Declarations**
```angularjs
private formSubscription: Subscription;
public keyUp = new Subject<KeyboardEvent>();
```

   


- **Key up event subscription declaration**
```angularjs
private action(): void {
  this.formSubscription = this.keyUp.pipe(
    map(event => (event.target as HTMLInputElement).value),
    debounceTime(1000)
  ).subscribe((data) => {
    console.log(data);
  });
}
```


  
- **Declare submit**: when user clicks on submit button `formSubscription` subscription will be unsubscribed, after service response will be set again.


`````angularjs
public submit(): void {
  this.formSubscription.unsubscribe();
  setTimeout(() => {
    this.action();
    console.log('asdasd++++++++++');
  }, 2000);

}
`````

- **Subscription initialization to listen to key up event**
```angularjs
constructor() {
   this.action();
}
```

- **Unsubscribe `formSubscription` when component dies** 

```angularjs
ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
}
```

Try demo [here](https://stackblitz.com/edit/angular-submit-form-along-with-auto-save?file=src/app/app.component.ts)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
