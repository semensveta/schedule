import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { EventClass } from '../../classes/event-class';
import { EventInterface } from '../../interfaces/event-interface';
import {
  EVENT_COLUMN_WIDTH,
  FIRST_COLUMN_X,
  SECOND_COLUMN_X,
  COLUMN_HEIGH,
} from '../schedule-grid/grid-constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public events;
  public isBusy: boolean;
  public selectedEventIndex: number;
  public selectedEvent: EventInterface;

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isBusy = true;
    this.events = this.getDayData();
    this.prepareEvents(this.events);
    this.drawEvents(this.events);
    this.selectedEventIndex = -1;
    this.isBusy = false;
  }

  private getDayData() {

    // TODO Should be sorted here
    let events = [
      {'start': 0, 'duration': 25, 'title': 'Morning yoga svkjsgjfkgjdfkjhfjhfjhgfjhjhjfdhjfdhfjh'},
      {'start': 60, 'duration': 50, 'title': 'Travel to work'},
      {'start': 100, 'duration': 50, 'title': 'Plan day'},
      {'start': 120, 'duration': 30, 'title': 'Skype Call'},
      {'start': 300, 'duration': 150, 'title': 'Lunch wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'}
    ];

    return events;
  }

  private drawEvents(events) {
    events.forEach((event) => {
      this.drawEvent(event);
    });
  }

  private drawEvent(event) {
    this.setPositionInSchedule(event);
  }

  private prepareEvents(events) {
    this.events = events.map((event) => new EventClass(event));
  }

  private setPositionInSchedule(currentEvent) {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      event.positionY = event.start <= COLUMN_HEIGH ? event.start : event.start - COLUMN_HEIGH;

      if (currentEvent.start < event.start && event.start < (currentEvent.start + currentEvent.duration)) {
        this.calculateConflictingEventXPosition(event, currentEvent);
      }

        if (currentEvent.width == EVENT_COLUMN_WIDTH) {
          this.calculateSingleEventXPosition(currentEvent);
      }
    }
  }

  private calculateConflictingEventXPosition(event, currentEvent) {
    currentEvent.width = EVENT_COLUMN_WIDTH/2;
    event.width = EVENT_COLUMN_WIDTH/2;

    if (event.start <= COLUMN_HEIGH) {
      currentEvent.positionX = currentEvent.positionX || FIRST_COLUMN_X;
      event.positionX = currentEvent.positionX === FIRST_COLUMN_X ? currentEvent.positionX + event.width : FIRST_COLUMN_X;
    } else {
      currentEvent.positionX = currentEvent.positionX || SECOND_COLUMN_X;
      event.positionX = currentEvent.positionX === SECOND_COLUMN_X ? currentEvent.positionX + event.width : SECOND_COLUMN_X;
    }
  }

  private calculateSingleEventXPosition(event) {
    event.positionX = event.start <= COLUMN_HEIGH ? FIRST_COLUMN_X : 350;
  }

  public selectEvent(event, i) {
    if (this.selectedEvent == event) {
      this.selectedEvent = null;
      this.selectedEventIndex = -1;
      return;
    }
    this.selectedEvent = event;
    this.selectedEventIndex = i;
  }

  public addEvent(event) {
    this.events.push(new EventClass(event));
    this.drawEvents(this.events);
  }

  public deleteEvent() {
    this.events.splice(this.selectedEventIndex, 1);
  };
}
