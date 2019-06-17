const { pipe, of, from, interval, timer, merge, fromEvent, combineLatest, concat, forkJoin } = Rx;
const { map, mapTo, tap, filter, scan, throttleTime, multicast, take, takeUntil, concatAll,pairwise, mergeMap } = RxOperators;
// https://rxviz.com/ 弹珠图 subscribe(res => console.log(res));
//cancat(.then) merge  combineLatest forkJoin(prrmiseAll)
const getPostOne$ = timer(3000).pipe(mapTo({id:1}));
const getPostTwo$ = timer(1000).pipe(mapTo({id:2}));
const intervalOne$ = Rx.Observable.interval(1000);
const intervalTwo$ = Rx.Observable.interval(2000);
forkJoin(getPostOne$,getPostTwo$);

//mergeMap
const post$ = of({id: 1});
const getPostInfo$ = timer(3000).pipe(mapTo({title: "Post title"}));
post$.pipe(mergeMap(post => getPostInfo$));

//pairwise
fromEvent(document,'scroll').pipe(
  map(e=>window.pageYOffset),
  pairwise()
)
//简单拖拽
const div = document.createElement('button');
div.setAttribute('style', 'height: 100px;width: 100px;position:relative');
output.prepend(div);
const body = document.body;
const mouseDown = fromEvent(div, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');
mouseDown.pipe(
  map(e=>mouseMove),
  takeUntil(mouseUp),
  concatAll(),
  map(event=>({x: event.clientX, y: event.clientY}))
).subscribe(
  pos=>{
    console.log(pos);
    div.style.left = pos.x-40 + 'px';
    div.style.top = pos.y-40 + 'px';
  }
);

