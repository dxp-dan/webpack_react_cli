const { Observable, pipe, of, from, interval, Subject, timer, merge, fromEvent, combineLatest, concat, forkJoin } = Rx;
const { map, mapTo, tap, filter, scan, throttleTime, multicast, take, takeUntil, concatAll, catchError } = RxOperators;
// https://rxviz.com/ 弹珠图 subscribe(res => console.log(res));

//简介
//observable 可观察对象(可被多次订阅) .subscribe unsubscribe
//observer   观察者      next complete error
//Operation  操作符      纯函数，接受一个Observable,返回一个新的Observable
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
//Subject BehaviorSubject(订阅后给最新的值) ReplaySubject(num)
const subject = new Subject();
output.prepend(button);
subject.pipe(
  mapTo(1),
  scan((origin, next) => origin + next)
)
const div = document.createElement('button');
div.setAttribute('style', 'height: 100px;width: 100px;position:relative;background-color:red');
div.setAttribute('onclick', 'event => this.subject.next(event)');

//cancat(.then) merge   forkJoin（一次）/zip（多次）/combineLatest（交替） (primiseAll)    
const getPostOne$ = timer(3000).pipe(mapTo({id:1}));
const getPostTwo$ = timer(1000).pipe(mapTo({id:2}));
const intervalOne$ = interval(1000);
const intervalTwo$ = interval(2000);
forkJoin(getPostOne$,getPostTwo$);


//debounceTime(间隔)  throttleTime(最高频率)   debounce throttle 降低事件的触发频率
const searchInput = document.createElement('input');
output.prepend(input);
fromEvent(searchInput, 'input').pipe(
  debounceTime(300),
  map(e => e.target.value),
);

//concatMap(concatAll + map 等待上一个回来) switchMap mergeMap 
function getPostData() {    
  return new Promise((req,rej)=>{
    setTimeout(()=>{console.log(555);req(1)},1000)
  })
}
fromEvent(document.body, 'click').pipe(
  concatMap(e=>from(getPostData()))
);


//catchError retry(number) retryWhen repeat  错误处理
zip(from(['a','b','c','d',2]),interval(500),(x,y)=>x).pipe(
	map(x=>x.toUpperCase()),
  catchError(error=>from('e'))
)

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
    div.style.left = pos.x-40 + 'px';
    div.style.top = pos.y-40 + 'px';
  }
);