import React from 'react'
import { render } from 'react-dom'
import { Input, Icon, Button  } from 'antd';
import { Observable, empty, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, combineLatest, SubscriptionLike, PartialObserver, concat, zip  } from 'rxjs';
import { map, mapTo, tap, filter, scan, throttleTime, multicast, refCount, take, combineAll, concatAll, takeUntil, last, startWith, debounce, debounceTime, catchError, switchMap, concatMap   } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ajax } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

class rxjs_L extends React.Component{
  constructor(){
    super()
    this.state={
      number: 1,
    }
  }
  componentDidMount(){
    //简单拖拽
    // const rxjsDiv = document.getElementById('rxjsL');
    // const body = document.body;
    // const mouseDown = fromEvent(rxjsDiv, 'mousedown');
    // const mouseUp = fromEvent(body, 'mouseup');
    // const mouseMove = fromEvent(body, 'mousemove');
    // const example = mouseDown.pipe(
    //   map(e=>mouseMove),
    //   takeUntil(mouseUp),
    //   concatAll(),
    //   map(event=>({x: event.clientX, y: event.clientY}))
    // );
    // example.subscribe(
    //   pos=>{
    //     console.log(pos);
    //     console.log(rxjsDiv);
    //     rxjsDiv.style.left = pos.x-40 + 'px';
    //     rxjsDiv.style.top = pos.y-40 + 'px';
    //   }
    // );
    

    // //concat方法
    // const source = interval(1000).pipe(take(3));
    // const source2 = of(3);
    // const source3 = of(4,5,6);
    // const example = concat(source, source2, source3);
    // example.subscribe(console.log)
    
    //scan 方法
    // const source = from('hello').pipe(
    //   scan((origin, next)=> origin + next , ''),
    //   last()
    // )
    // source.subscribe(console.log)

    // const addButton = document.getElementById('add');
    // const minusButton = document.getElementById('minus');
    // const sourceAdd = fromEvent(addButton, 'click').pipe(mapTo(1));
    // const sourceMinus = fromEvent(minusButton, 'click').pipe(mapTo(-1));
    // const number = empty().pipe(
    //   startWith(this.state.number),
    //   merge(sourceAdd, sourceMinus),
    //   scan((origin, next) => origin + next, 0),
    // );
    // number.subscribe(console.log);
    
    //debounce 
    // const reqButton = document.getElementById('request');
    // const source = fromEvent(reqButton, 'click');
    // const example = source.pipe(
    //   map(x=>{console.log(x);return 1),
    //   debounceTime(1000),
    // );
    // example.subscribe(x=>console.log(x))

    //catchError  断线重连
    // const source = from(['a','b','c','d', 2 ]);
    // const example = zip(source, interval(500), (x, y) => x).pipe(
    //   map(x=>x.toUpperCase()),
    //   catchError((err, obs) => obs )
    // );
    // example.subscribe(console.log)

     //concatAll  扁平化处理
    // var click = fromEvent(document.body, 'click');
    // var source = click.pipe(
    //   map(e => interval(0).pipe(take(3))),
    //   concatAll()
    // );
    // source.subscribe({    
    //   next: (value) => { console.log(value); },
    //   error: (err) => { console.log('Error: ' + err); },
    //   complete: () => { console.log('complete'); }
    // });// (点击后)// 0// 1// 2// 3// 4// 5 ...

    // //concatMap 用在发送 HTTP request 每点击一次发一个请求 但每次会等上一个请求回来再发送下一个
    // function getPostData() {    
    //   return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
    // }
    // var source = fromEvent(document.getElementById('request'), 'click');
    // var example = source.pipe(
    //   concatMap(
    //     e => from(getPostData())
    //   )
    // );
    // example.subscribe({
    //   next: (value) => { console.log(value); },
    //   error: (err) => { console.log('Error: ' + err); },
    //   complete: () => { console.log('complete'); }
    // });

    //switchMap  用在发送 HTTP request value只有一个 不会造成任何的 side-effect
    // function getPostData() {    
    //   return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
    // }
    // var source = fromEvent(document.getElementById('request'), 'click');
    // var example = source.pipe(
    //   switchMap(
    //     e => from(getPostData())
    //   )
    // );
    // example.subscribe({
    //   next: (value) => { console.log(value); },
    //   error: (err) => { console.log('Error: ' + err); },
    //   complete: () => { console.log('complete'); }
    // });

    //mergeMap 
    // function getPostData() {    
    //   return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
    // }
    // var source = fromEvent(document.body, 'click');
    // var example = source.mergeMap(
    //   e => from(getPostData()));
    // example.subscribe({
    //   next: (value) => { console.log(value); },
    //   error: (err) => { console.log('Error: ' + err); },
    //   complete: () => { console.log('complete'); }
    // });

    // concatMap 用在可以确定内部的 observable 结束时间比外部 observable 发送时间来快的情境，并且不希望有任何并行处理行为，适合少数要一次一次完成到底的的 UI 动画或特别的 HTTP request 行为。
    // switchMap 用在只要最后一次行为的结果，适合绝大多数的使用情境。
    // mergeMap 用在并行处理多个 observable，适合需要并行处理的行为，像是多个 I/O 的并行处理。
    //debounceTime 等待 100 毫秒再发送 请求 若有新的请求抛弃前面的observable

    // var source = interval(1000).pipe(take(3));
    // var observerA = {    
    //   next: value => console.log('A next: ' + value),    
    //   error: error => console.log('A error: ' + error),    
    //   complete: () => console.log('A complete!')
    // }
    // var observerB = {   
    //   next: value => console.log('B next: ' + value),    
    //   error: error => console.log('B error: ' + error),    
    //   complete: () => console.log('B complete!')
    // }
    // var subject = new Subject()

    // subject.subscribe(observerA)

    // source.subscribe(subject);

    // setTimeout(() => {
    //     subject.subscribe(observerB);
    // }, 1000);// "A next: 0"// "A next: 1"// "B next: 1"// "A next: 2"// "B next: 2"// "A complete!"// "B complete!"


    //multicast 返回有一个需要connect的observable
    // var source = interval(1000).pipe(
    //   take(3),
    //   multicast(new Subject())
    // );
    // ;
    // var observerA = {    
    //   next: value => console.log('A next: ' + value),    
    //   error: error => console.log('A error: ' + error),    
    //   complete: () => console.log('A complete!')
    // }
    // var observerB = {    
    //   next: value => console.log('B next: ' + value),    
    //   error: error => console.log('B error: ' + error),    
    //   complete: () => console.log('B complete!')
    // }
    // source.subscribe(observerA); // subject.subscribe(observerA)source.connect(); // source.subscribe(subject)setTimeout(() => {
    // source.subscribe(observerB); // subject.subscribe(observerB)}, 1000);

    // source.connect();
  
  //refCount 必须搭配 multicast 一起使用，他可以建立一个只要有订阅就会自动 connect 的 observable
  // var source = interval(1000).pipe(
  //   tap(x => console.log('send: ' + x)),
  //   multicast(new Subject()),
  //   refCount()
  // );
  // var observerA = {    
  //   next: value => console.log('A next: ' + value),    
  //   error: error => console.log('A error: ' + error),    
  //   complete: () => console.log('A complete!')
  // }
  // var observerB = {    
  //   next: value => console.log('B next: ' + value),    
  //   error: error => console.log('B error: ' + error),    
  //   complete: () => console.log('B complete!')
  // }

  // var subscriptionA = source.subscribe(observerA);// 订阅数 0 => 1

  // var subscriptionB;
  // setTimeout(() => {
  //   subscriptionB = source.subscribe(observerB);    // 订阅数 0 => 2
  // }, 1000);

  // setTimeout(() => {
  //   subscriptionA.unsubscribe(); // 订阅数 2 => 1
  //   subscriptionB.unsubscribe(); // 订阅数 1 => 0，source 停止发送元素
  // }, 5000);

  //publish === multicast(new Rx.Subject()) 
  // publish + refCount === share
 
  const source = of(1,2,3);
  const rxjsDiv = document.getElementById('request');
  const divSource = fromEvent(rxjsDiv, 'click');
  const example = concat(rxjsDiv, divSource);
  example.subscribe(x=>console.log(x));
}
  render(){
    return (
      <div>
        <h3>rxjs_L</h3>
        <div id="rxjsL" style={{width: 80, height: 80, background: 'lightGreen' }}></div>
        <div>{this.state.number}</div>
        <Button id="add">+</Button>
        <Button id="minus">-</Button> 
        <Button id="request">请求</Button>
      </div>
    )
  }
}

export default rxjs_L;