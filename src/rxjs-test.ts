import {
  Observable,
  debounceTime,
  of,
  take,
  from,
  fromEvent,
  interval,
  count,
  takeUntil,
  skipWhile,
  tap,
  map,
  delay,
  delayWhen,
  timer,
  combineLatest,
  defer,
  throwError,
  share,
  max,
  min,
  last,
  first,
  retry,
  retryWhen,
} from 'rxjs';
// # Create new Observeable
// of преобразует аргументы в наблюдаемую последовательность.
const of$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11); // convert items to next(1), next(2)
// from преобразует различные другие объекты и типы данных в Observable (Promise, массивный или итерируемый объект)
const from$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]); // convert items to next(1), next(2)
// convertn event to Observaable Events
const fromEvent$ = fromEvent(document, 'click');
const interval$ = interval(1000); // genrate number of intervals 1sec => [next => 0, next => 1, next => 2, next => 3, next => 4, next => 5]
const titem$ = timer(0, 100);
const error$ = throwError('message');

//! OPERATORS
// todo ## Transformation
// map(v => v + "1")  => as  map in JS
// scan((acc, cur) => acc + curr, init) => as reducer in JS
// budder(click$) => buffering previous items
// clicks = fromEvent(document, 'click', { capture: true });interval(1000).pipe(buffer(clicks)); => chank [1,2,3]   [4,5,6]
// todo ## Filtering
// take(5); // take 5 first result
// skip(5); // skip 5 first result
// skipLast(2)
// filter(x => x !== undefined); // filter
// distinct() // 1) remove repeat elements
// distinct({name} => name) // 1) remove repeat property with name (object.name => unical)
///DifferentUntilChanged() 0,1,2,3,1,2 3
// last() === from$.pipe(last()) => 11 // or from$.pipe(last(num => num === 0, "not found")) => non found
// first() === from$.pipe(first()) => 0 // or from$.pipe(last(num => num === 1, "not found")) => 1
// todo ## Error handling
// ThrowError("message").pipe(CatchError(err => cl(er)))
// catchError(err => of('New',"Observeable")) // handling error or return new Observeable
// retry(3) // if Erorr => resubscribe 3 time on the orinal Observable, otherwise there will be infinity loop
// onErrorResumeNext( of(1, 2, 3, 0).pipe( map(x => { if (x === 0) { throw Error(); } return 10 / x; }) ), of(1, 2, 3) )
// onErrorResumeNext => if Erorr || Observable complited ==> going to new Observable
// todo ## Conditions
// skipUntil = interval$.pipe(skipUntil(fromEvent$)) // skip ALL after EVENT
// takeUntil() = interval$.pipe(takeUntil(fromEvent$)) // skip ALL before EVENT
// ? skipWhile() = interval$.pipe(skipWhile((v, i) => v !== 10)); // 10, 11, 12 ; true skip
// ? takeWhile() = interval$.pipe(takeWhile((v, i) => v !== 10)) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9; false skip
// todo ## Mathematical
// min() => [7,-1,0,1,3] => return -1 // or //  min((a, b) => a.age < b.age ? -1 : 1)
// max() => [7,-1,0,1,3] => return 7  // or //  max((a, b) => a.age < b.age ? -1 : 1)
// count() => return count Observable
// interval$.pipe(skipWhile((v) => v === 5)).pipe(count());
// todo ## Utils
// tap(console.log), // use how midleware
// tap((n) => { if (n > 6) { throw new TypeError(`Value ${n} is greater than 6`); } })
// delay(1000) // delay Observable items on the same interval or some date // or// delay(new Date('March 15, 2050 12:00:00'))
// delayWhen(() => interval(Math.random() * 1000)) // randowm delay
// todo ##  Connectable Observable
// share() => шаринг обсервера, как толоько подписчики пропадут то он пропадет
// todo ##  Combine
// CombineLatest([interval(500),interval(1000)]) // [1,0] [2,0] [3,1] объединить потоки
// interval(1000).pipe(WithLatestFrom(interval(500)) // [0,1] [1,3] [2,5] объединить потоки при одновременно вызове
// ## defer() => разные занчения

const shared = from$.pipe(
  map((v) => {
    if (v === 9) {
      throw 'Error ' + v;
    }
    return v;
  }),

  share()
);

shared.subscribe(
  (v) => console.log(v),
  (err) => console.log(err)
);

console.log('End subscribe');
