## Getting Started

### Prerequisites

- Rxjs
- JQUery

### Installation

```sh
$ npm install
```

### Running App

```sh
$ npm start
```

## RxJS Notes

[Thanks to RxJS Crash Course.](https://www.youtube.com/watch?v=ei7FsoXKPl0) 

### Reactive Programming

- Programming paradigm that works with asynchronous data streams
- Data streams can be created from many things,
  - UI Events
  - Http Request
  - File System
  - Array like Objects.

### Stream

- Sequence of ongoing events ordered in time that emits a value, error & completed

<p align="center">
  <img width="400" alt="Stream" src="./img/stream.png">
</p>

### Observables

- Used to watch these streams & emit functions
- Can be subscribed by an observer
- Will constantly watching streams & update accordingly
- We can interact with data streams as any regular array

<p align="center">
  <img width="600" alt="Stream" src="./img/observables.png">
</p>

### Reactive Extension/ReactiveX

- Library for composing Asynchronous program by using observable sequence.
- Provides a list of operators to filter, select, transform, combine & composable observables


## Covered Details

- Examining data streams from events
- Creating observables from array like objects
- Creating observables from scratch
- Filtering & Transforming observables
- Promise to observables
- Many helpful operators
- Error handling

### Examining data streams from events

- For button, click events

```sh
const btn = $('#btn');
const btn$ = Rx.Observable.fromEvent(btn, 'click');
btn$.subscribe(
  (value) => console.log(value),
  (err) => console.log(err),
  (completed) => console.log(completed)
);
```

- Try the same for input field, mousemove over the document

### Creating observables from array like objects

- For Array

```sh
const numbers = [10, 20, 30, 40, 50];
const numbers$ = Rx.Observable.from(numbers);
numbers$.subscribe(
  (value) => console.log(value),
  (err) => console.log(err),
  (completed) => console.log(completed)
);
```

- For Array like Objects

```sh
const posts = [
  {title: "Post 1", body: "Post body 1"},
  {title: "Post 2", body: "Post body 2"},
  {title: "Post 3", body: "Post body 3"},
  {title: "Post 4", body: "Post body 4"}
];
const posts$ = Rx.Observable.from(posts);
```

- For Set (Array have any type of data)

```sh
const set = new Set(['Hello', 44, {title: "Hi Thangadurai!"}]);
const set$ = Rx.Observable.from(set);
```

- For Map (Set of key,value pair)

```sh
const map = new Map([[1,2], [2,3], [3,4]]);
const map$ = Rx.Observable.from(map);
```

### Creating observables from scratch

```sh
const source$ = new Rx.Observable(observer => {
  console.log("Creating Observable");

  observer.next("Hi Team");
  observer.next("Test Next");
  
  observer.error(new Error("Error Occured!"));

  setTimeout(() => {
    observer.next("After timeout of 3 seconds!")
    observer.complete();
  }, 3000);
});
source$
.catch(err => Rx.Observable.of(err))
.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log("completed")
);
```

### Promise to observables

```sh
const getUser = (username) => {
  return $.ajax({
    url: `https://api.github.com/users/${username}`,
    dataType: 'jsonp'
  }).promise();
}
const input = $('#btn');
const input$ = Rx.Observable.fromEvent(input, 'keyup');
const promise$ = Rx.Observable.fromPromise(getUser('thangaduraicse'));
promise$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log("completed")
);
```

### Interval, Timer, Range

```sh
Rx.Observable.interval(2000).take(5);
Rx.Observable.timer(2000, 2000).take(5);
Rx.Observable.range(100, 50);
```

### Map, Pluck, Merge, Concat, SwitchMap

```sh
  Rx.Observable.from(["hello", "test"])
    .map(v => v.toUpperCase());
  
  const posts = [
    {title: "Post 1", body: "Post body 1"},
    {title: "Post 2", body: "Post body 2"},
    {title: "Post 3", body: "Post body 3"},
    {title: "Post 4", body: "Post body 4"}
  ];
  const posts$ = Rx.Observable.from(posts).pluck('title');
```
