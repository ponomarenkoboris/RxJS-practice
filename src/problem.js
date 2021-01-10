import { interval } from 'rxjs';
import { filter, map, take, scan } from 'rxjs/operators';
const btn = document.getElementById('interval');
const rxjsBtn = document.getElementById('rxjs');
const display = document.querySelector('#problem .result');

const people = [
  {name: 'Vladilen', age: 25},
  {name: 'Elena', age: 17},
  {name: 'Ivan', age: 18},
  {name: 'Igor', age: 14},
  {name: 'Lisa', age: 32},
  {name: 'Irina', age: 23},
  {name: 'Oleg', age: 20}
]
// native js
btn.addEventListener('click', () => {
  btn.disabled = true;
  let index = 0;
  const canDrink = [];

  const interval = setInterval(() => {
    if (people[index]) {
      if (people[index].age >= 18) {
        canDrink.push(people[index].name);
      }
      display.textContent = canDrink.join(' ');
      index++;
    } else {
      clearInterval(interval);
      btn.disabled = false;
    } 
  }, 1000)
})
// RxJS
rxjsBtn.addEventListener('click', () => {
  rxjsBtn.disabled = true;
  interval(1000)
    .pipe(
      take(people.length),
      filter(value => people[value].age >= 18),
      map(value => people[value].name),
      scan((acc, value) => acc.concat(value), [])
    )
    .subscribe(res => {
      display.textContent = res.join(' ');
      
    }, null, () => rxjsBtn.disabled = false)
})