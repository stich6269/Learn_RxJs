import {Observable} from "rxjs/Rx";

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const halfButton = document.querySelector('#half');
const quarterButton = document.querySelector('#quarter');
const input = document.querySelector('#input');


const start$ = Observable.fromEvent(startButton, 'click');
const stop$ = Observable.fromEvent(stopButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');
const half$ = Observable.fromEvent(halfButton, 'click');
const quarter$ = Observable.fromEvent(quarterButton, 'click');
const input$ = Observable.fromEvent(input, 'input');

const interval$ = Observable.interval(500);
const intervalThatStop$ = interval$.takeUntil(stop$);

/*----------------------------------------------------------*/
/*Observable is a some kind off Array, which you can use
 * whatever you want. We can create something like this using
 * classes in Javascript 6.0*/

/*switchMapTo - is using for checkout stream, for example,
 * if we have one stream, than using .switchMapTo(interval$),
 * subscribe callback will get new data stream from interval$ observable
 * instead switchMapTo we could also use switchMapTo and pass to this
 * new Observable, here's an example
 **/

/* Observable.fromEvent(startButton, 'click')
 .switchMap(event => Observable.interval(1000))
 .subscribe(x => console.log(x));

start$
 .switchMapTo(interval$)
 .subscribe(x => console.log(x));*/


/*----------------------------------------------------------*/
/*Attention below is ANTI PATTERN, don't use it at all*/
/*we could stop event listener using unsubscribe() function.
 * each subscribe funk returns subscription,
 * which we have to use for this*/

/*Observable.fromEvent(stopButton, 'click')
  .subscribe(() => {
    subscription.unsubscribe();
  });*/


/*take Until will wort until we will not got an event
* from passed observable*/


/*start$
  .switchMapTo(intervalThatStop$)
  .subscribe(x => console.log(x));*/



/*------------------------------------*/
/*scan - does the same as reduce in javascript
* acc - accumulator
* {count: 0} - initialize*/

/*start$
  .switchMapTo(intervalThatStop$)
  .scan((acc) => {
    return {count: acc.count + 1}
  }, {count: 0})
  .subscribe((x) => console.log(x));*/


/*------------------------------------*/
/*startWith - will run subscribe callback once
* before event stream will start*/
/*
let data = {count: 0};

start$
  .switchMapTo(intervalThatStop$)
  .startWith(data)
  .scan((acc) => {
    return {count: acc.count + 1}
  })
  .subscribe((x) => console.log(x));
*/


/*-----------------------------------*/
/*mapTo - allow to us use custom tic function.
* in this example we have interval tic, witch returns 1, 2 each 500ms
* but we won't to use it, we wont to run inc function each 500ms
* so we have to use mapTo(inc) to pass callback*/

/*let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});

start$
  .switchMapTo(intervalThatStop$)
  .mapTo(inc)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe((x) => console.log(x));*/



/*-------------------------------------*/
/*merge - provide an ability to select between two streams
* in this example works as "if" instruction
* if ve have intervalThatStop$ event, we will use "inc" func
* and if we have reset$ event, we will use "res" func*/

/*let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});
let incOrRes = Observable.merge(
  intervalThatStop$.mapTo(inc),
  reset$.mapTo(res)
);

start$
  .switchMapTo(incOrRes)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe((x) => console.log(x));*/



/*-------------------------------------*/
/*let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});

let starter$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);


let intervalActions = (time) => Observable.merge(
    Observable.interval(time)
      .takeUntil(stop$).mapTo(inc),
    reset$.mapTo(res)
  );


starter$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe((x) => console.log(x));*/



/*-------------------------------------*/
/*input$
  .map(event => event.target.value)
  .subscribe((data) => console.log(data));*/



/*-------------------------------------*/
/*combineLatest - we could use for combine two or more streams
* in this example we combine timer and input stream*/

/*
let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});

let starter$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);

let intervalActions = (time) => Observable.merge(
  Observable.interval(time)
    .takeUntil(stop$).mapTo(inc),
  reset$.mapTo(res)
);

let timer$ = starter$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc));

let inputStream$ = input$
  .map(event => event.target.value);

Observable.combineLatest(timer$, inputStream$,
  (timer, input) => ({time: timer.count, input: input}))
  .subscribe(x => console.log(x));
*/



/*-------------------------------------*/
/*filter du the same as filter in JS*/
/*let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});

let starter$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);

let intervalActions = (time) => Observable.merge(
  Observable.interval(time)
    .takeUntil(stop$).mapTo(inc),
  reset$.mapTo(res)
);

let timer$ = starter$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc));

let inputStream$ = input$
  .map(event => event.target.value);

Observable.combineLatest(timer$, inputStream$,
  (timer, input) => ({time: timer.count, input: input}))
  .filter(data => data.time === parseInt(data.input))
  .subscribe(x => console.log(x));*/


/*----------------------------------*/
/*takeWhile - work the same like filter
* but could trigger done event too*/

/*let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});

let starter$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);

let intervalActions = (time) => Observable.merge(
  Observable.interval(time)
    .takeUntil(stop$).mapTo(inc),
  reset$.mapTo(res)
);

let timer$ = starter$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc));

let inputStream$ = input$
  .map(event => event.target.value);

Observable.combineLatest(timer$, inputStream$,
  (timer, input) => ({time: timer.count, input: input}))
  .takeWhile(data => data.time <= 3)
  .subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('Complete')
  );*/



/*-----------------------------------*/
/*reduce - vre could accumulate some data
* and than we will push they after observer will be complete*/

/*do - we can use just fo monitor some data,
* this function don't do anything with a stream */

/*repeat - we can use it for create infinite observable
 * which will never be done, we should use thi before subscribe
  * function*/
let data = {count: 0};
let inc = (acc) => ({count: acc.count + 1});
let res = (acc) => ({count: 0});

let starter$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);

let intervalActions = (time) => Observable.merge(
  Observable.interval(time)
    .takeUntil(stop$).mapTo(inc),
  reset$.mapTo(res)
);

let timer$ = starter$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc));

let inputStream$ = input$
  .map(event => event.target.value);

Observable.combineLatest(timer$, inputStream$,
  (timer, input) => ({time: timer.count, input: input}))
  .do(x => console.log(x))
  .takeWhile(data => data.time <= 3)
  .reduce((acc, curr) => acc+1, 0)
  .repeat()
  .subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('Complete')
  );
