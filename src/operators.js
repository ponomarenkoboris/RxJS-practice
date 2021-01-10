// Операторы
import { interval, fromEvent } from 'rxjs';
import { map, filter, tap, take, takeLast, takeWhile, scan, reduce, switchMap } from 'rxjs/operators';

// Смена стримов
fromEvent(document, 'click')
    .pipe(
        switchMap(event => {
            return interval(1000)
                .pipe(
                    tap(val => console.log('tap', val)),
                    take(5),
                    reduce((acc, val) => acc + val, 0)
                );
        })
    )
    .subscribe(
        {
            next: val => console.log('Next', val),
            complete: () => console.log('Comlite')
        }
    )

// const stream$ = interval(1000)
//     .pipe(
//         // tap(val => console.log('tap: ', val)), // Выполняет побочный эффект для каждого излучения в источнике Observable, но возвращает Observable, идентичный источнику.
//         // map(val => val * 3), // Применяет заданную функцию проекта к каждому значению, испускаемому исходным Observable, и выдает полученные значения как Observable.
//         // filter(val => val % 2 === 0), // фильтрация
//         take(10), // сообщает на каком занчении нужно остановить стрим 
//         // takeLast(5) // запоминает последние значения
//         // takeWhile(val => val < 7) // указываем стриму до каких пор ему нужно работать
//         // scan((acc, val) => acc + val, 0), // Применяет функцию аккумулятора к исходному Observable и возвращает каждый промежуточный результат с необязательным начальным значением.
//         // reduce((acc, val) => acc + val, 0) // Такой же принцип как у scan, но работает с уже завершённым стримом
//     )
// stream$.subscribe({
//     next: val => console.log('Next: ', val),
//     complete: () => console.log('Comlite')
// });