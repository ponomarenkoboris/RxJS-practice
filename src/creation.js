// Создание собственных стримов
import { of, from, Observable, fromEvent, range, timer, interval } from 'rxjs';
import {map, scan} from 'rxjs/operators';

// of преобразует аргументы в наблюдаемую последовательность
const stream$ = of(1, 2, 4, 5); // $ - обозначаются те перменные, которые являются стримами
stream$.subscribe(value => {
    console.log('value', value);
})

// from работает также как и of только всегда работает только с массивами
const arr$ = from([1, 2, 3, 4]).pipe(
    scan((acc, value) => acc.concat(value), [])
)
arr$.subscribe(value => {
    console.log(value);
})

// Observable - Представление любого набора значений за любой промежуток времени. Это самый простой строительный блок RxJS. (Позволяет созавать совственные стримы)
const stream2$ = new Observable(observer => {

    observer.next('First value');
    setTimeout(() => observer.next('After 1 second'), 1000);
    setTimeout(() => observer.complete(), 1500);
    setTimeout(() => observer.error('Something went wrong'), 2000);
    setTimeout(() => observer.next('After 3 second'), 3000);
})

stream2$.subscribe(
    (value) => console.log('value', value),
    (error) => console.log(error),
    () => console.log('Complite')
)
stream2$.subscribe({
    next(value) {
        console.log(value);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('Complite');
    }
})

// fromEvent метод, который позволяет создавать стрим из событий
fromEvent(document.querySelector('canvas'), 'mousemove')
    .pipe(
        map(event => ({
            x: event.offsetX,
            y: event.offsetY,
            ctx: event.target.getContext('2d')
        }))
    )
    .subscribe(pos => {
        pos.ctx.fillRect(pos.x, pos.y, 2, 2)
    })

const clear$ = fromEvent(document.querySelector('#clear'), 'click')
clear$.subscribe(() => {
    const canvas = document.querySelector('canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
});

// interval работает как setInterval
const sub = interval(500).subscribe(value => console.log(value));
setTimeout(() => sub.unsubscribe(), 4000);

// timer работает как setTimeout
timer(2500).subscribe(value => console.log(value));

// range позволяет создавать определённые стримы, состоящие из определённого набора чисел
range(42, 10).subscribe(value => console.log(value));