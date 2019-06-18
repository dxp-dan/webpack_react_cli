const { Observable, pipe, of, from, interval, timer, merge, fromEvent, combineLatest, concat, forkJoin } = Rx;
const { map, mapTo, tap, filter, scan, throttleTime, multicast, take, takeUntil, concatAll,pairwise, mergeMap } = RxOperators;

//简介
//observable 可观察对象  .subscribe unsubscribe
//observer   观察者      next complete error
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});


// https://rxviz.com/ 弹珠图 subscribe(res => console.log(res));
//cancat(.then) merge  combineLatest forkJoin(prrmiseAll)
const getPostOne$ = timer(3000).pipe(mapTo({id:1}));
const getPostTwo$ = timer(1000).pipe(mapTo({id:2}));
const intervalOne$ = interval(1000);
const intervalTwo$ = interval(2000);
forkJoin(getPostOne$,getPostTwo$);

//mergeMap
const post$ = of({id: 1});
const getPostInfo$ = timer(3000).pipe(mapTo({title: "Post title"}));
post$.pipe(mergeMap(post => getPostInfo$));


//简单拖拽
const div = document.createElement('div');
div.setAttribute('style', 'height: 100px;width: 100px;position:relative;background-color:red');
output.prepend(div);
const body = document.body;
const mouseDown = fromEvent(div, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');
mouseDown.pipe(
  map(e=>mouseMove),
  takeUntil(mouseUp),
  concatAll(),
  map(event=>({x: event.clientX, y: event.clientY})),
).subscribe(
  pos=>{
    console.log(pos);
    div.style.left = pos.x-40 + 'px';
    div.style.top = pos.y-40 + 'px';
  }
);


//debounce  throttle
const searchInput = document.createElement('input');
output.prepend(input);
fromEvent(searchInput, 'input').pipe(
  debounceTime(300),
  map(e => e.target.value),
);

//catch retry retryWhen repeat 
Rx.Observable.from(['a','b','c','d',2])
.zip(Rx.Observable.interval(500), (x,y) => x);var example = source
.map(x => x.toUpperCase())
.catch(error => Rx.Observable.of('h'));
