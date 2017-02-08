import {BehaviorSubject} from "rxjs/BehaviorSubject";

let pending = new BehaviorSubject(null);
pending.subscribe(data => {if(data) console.log(data)});
setTimeout(() => {
  pending.next('hello world');
}, 1000);
