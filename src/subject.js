// Subject 
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// Subject - позволяет подписываться на собственные стримы
document.addEventListener('click', () => {
    const stream$ = new Subject();
    stream$.subscribe(value => console.log(value));
    stream$.next('Hello!');    
    stream$.next('Rx');
    stream$.next('JS');
});

// BehaviorSubject работает также как и Subject, но у него есть значения по умолчанию
document.addEventListener('click', () => {
    const stream$ = new BehaviorSubject('First');
    stream$.subscribe(value => console.log(value));
    stream$.next('Hello!');    
    stream$.next('Rx');
    stream$.next('JS');
});

// ReplaySubject позволяет запомнить задиспаченные значения (Можно контролировать вывод указывая размер буфера)
document.addEventListener('click', () => {
    const stream$ = new ReplaySubject(3);
    
    stream$.next('Hello!');    
    stream$.next('Rx');
    stream$.next('JS');

    stream$.subscribe(value => console.log(value));
});