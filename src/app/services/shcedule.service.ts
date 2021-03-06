import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '../interfaces/app-state';
import { SET_EVENTS } from '../classes/action-class';
import { EventClass } from '../classes/event-class';

let events = [
  {'start': 0, 'duration': 25, 'title': 'Morning yoga svkjsgjfkgjdfkjhfjhfjhgfjhjhjfdhjfdhfjh'},
  {'start': 100, 'duration': 50, 'title': 'Plan day'},
  {'start': 120, 'duration': 30, 'title': 'Skype Call'},
  {'start': 250, 'duration': 120, 'title': 'Meeting'},
  {'start': 385, 'duration': 150, 'title': 'Lunch wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'}
];


@Injectable()
export class ScheduleService {
  store;
  intersections;


  constructor(
    store: Store<AppStateInterface>
  ) {
    this.store = store;
    this.store.select('intersections').
      subscribe((intersections) => {
      this.intersections = intersections;
    });
  }


  private prepareEvents(eventArr) {
    return eventArr.map((event) => new EventClass(event));
  }

  private getEvents() {
    return new Observable((observer) => {
        observer.next(events);
    });
  }

  public getScheduleData() {
    return this.getEvents()
      .pipe(map((response) => {
        this.store.dispatch({type: SET_EVENTS, payload: this.prepareEvents(response)});
        return this.prepareEvents(response);
      }));
  }

  public deleteEvent(i) {
    events.splice(i, 1);
    this.sortEvents();
    this.store.dispatch({type: SET_EVENTS, payload: this.prepareEvents(events)});
  }

  public addEvent(event) {
    return new Observable((observer) => {
      if (this.isAddingAllowed(event)) {
        events.push(event);
        this.sortEvents();
        this.store.dispatch({type: SET_EVENTS, payload: this.prepareEvents(events)});
        observer.next(events);
      } else {
        observer.error('Adding is not allowed. You have already planned two events on this time');
      }
    })
      .pipe(map(response => this.prepareEvents(response)));
  }

  private sortEvents() {
    events = events.sort((a, b) => {
      return a.start - b.start;
    });
  }

  private isAddingAllowed(event) {
    // this.intersections.forEach((intersection) => {
    //   if (intersection.start <= event.start && event.start <= intersection.end) {
    //     return false;
    //   }
    // });
    for (let i = 0; i < this.intersections.length; i++) {
        if (this.intersections[i].start < (event.start + event.duration) && this.intersections[i].end > event.start) {
          return false;
        }
    }
    return true;
  }

}
