import {Observable} from "rxjs/Rx";


function lessons1() {
  const startButton = document.querySelector('#start');

/*  Observable.fromEvent(startButton, 'click')
    .switchMap(event => Observable.interval(1000))
    .subscribe(x => console.log(x));*/


  const interval$ = Observable.interval(500),
    start$ = Observable.fromEvent(startButton, 'click');

  start$
    .switchMapTo(interval$)
    .subscribe(x => console.log(x));




}








lessons1();

