import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventClass } from '../classes/event-class';
import { map } from 'rxjs/operators';

let events = [
  {'start': 0, 'duration': 25, 'title': 'Morning yoga svkjsgjfkgjdfkjhfjhfjhgfjhjhjfdhjfdhfjh'},
  {'start': 60, 'duration': 50, 'title': 'Travel to work'},
  {'start': 100, 'duration': 50, 'title': 'Plan day'},
  {'start': 120, 'duration': 30, 'title': 'Skype Call'},
  {'start': 300, 'duration': 150, 'title': 'Lunch wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'}
];

@Injectable()
export class ScheduleService {


  constructor() { }

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
      .pipe(map(response => this.prepareEvents(response)));
  }

  public deleteEvent(i) {
    events.splice(i, 1);
  }
  public addEvent(event) {
    return new Observable((observer) => {
      if (this.isAddingAllowed(event)) {
        events.push(event);

        this.sortEvents();

        observer.next(events);
      } else {
        observer.error('Adding not allowed');
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
    return true;
  }

}
