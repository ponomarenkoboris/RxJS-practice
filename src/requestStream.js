import './images/github.svg';
import './images/vk.svg';
import './images/facebook.svg';
import './images/instagram-logo.svg';
import { EMPTY, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
const URL = 'https://api.github.com/search/users?q=';
const URL_INSTAGRAM = '';
const URL_VK = 'https://vk.com/';

const search = document.querySelector('#search');
const result = document.querySelector('#result');

const stream$ = fromEvent(search, 'input')
    .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => result.innerHTML = ''),
        filter(val => val.trim()),
        switchMap(val => ajax.getJSON(URL + val).pipe(
            catchError(err => EMPTY)
        )),
        map(res => res.items),
        mergeMap(items => items)
    )

stream$.subscribe(user => {
    const html = `
        <div class="card">
            <div class="card-image">
                <img src="${user.avatar_url}">
                <span class="card-title">${user.login}</span>
            </div>
            <div class="card-action">
                <a href="${user.html_url}" target="_blank">Открыть github</a>
            </div>
        </div>
    `
    result.insertAdjacentHTML('beforeend', html);
});

