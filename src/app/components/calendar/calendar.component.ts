import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { EventClass } from '../../classes/event-class';
import {EventInterface} from '../../interfaces/event-interface';

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
    this.drawEvents(this.events);
    this.prepareEvents(this.events);
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

    console.log(events);
  }

  private drawEvent(event) {
    this.setPositionInSchedule(event);
  }

  private prepareEvents(events) {
    events.map((event) => new EventClass(event));
    return events;
  }

  private setPositionInSchedule(currentEvent) {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];

      if (currentEvent.start < event.start && event.start < (currentEvent.start + currentEvent.duration)) {
        currentEvent.width = 100;
        event.width = 100;

        if (event.start <= 270) {
          currentEvent.positionX = currentEvent.positionX || 50;
          event.positionX = currentEvent.positionX === 50 ? 150 : 50;
          event.positionY = event.start;
          currentEvent.positionY = currentEvent.start;
        } else {
          currentEvent.positionX = currentEvent.positionX || 350;
          event.positionX = currentEvent.positionX === 350 ? 450 : 350;
          event.positionY = event.start - 270;
          currentEvent.positionY = currentEvent.start - 270;
        }
        return;
      }
    }

    if (!currentEvent.width) {
      currentEvent.width = 200;

      if (currentEvent.start <= 270) {
        currentEvent.positionX = 50;
        currentEvent.positionY = currentEvent.start;
      } else {
        currentEvent.positionX = 350;
        currentEvent.positionY = currentEvent.start - 270;
      }
    }
  }

  public selectEvent(event, i) {
    if (this.selectedEvent == event) {
      this.selectedEvent = null;
      this.selectedEventIndex = -1;
      return;
    }
    this.selectedEvent = event;
    this.selectedEventIndex = i;
    console.log(this.selectedEventIndex);
    this.ref.markForCheck();
  }

  public addEvent() {
  }

  public deleteEvent() {
    this.events.splice(this.selectedEventIndex, 1);
  };
}
