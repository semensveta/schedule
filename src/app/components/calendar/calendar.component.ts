import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { EventInterface } from '../../interfaces/event-interface';
import { AppStateInterface } from '../../interfaces/app-state';
import {
  EVENT_COLUMN_WIDTH,
  FIRST_COLUMN_X,
  SECOND_COLUMN_X,
  COLUMN_HEIGHT,
} from '../schedule-grid/grid-constants';
import { ScheduleService } from '../../services/shcedule.service';
import {ADD_INTERSECTION, RESET_INTERSECTIONS} from '../../classes/action-class';
import { EventClass } from '../../classes/event-class';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  public store;
  public events;
  public isBusy: boolean;
  public selectedEventIndex: number;
  public doubledEventIndex: number;
  public selectedEvent: EventInterface;
  public events$;
  public intersections$;

  constructor(
    store: Store<AppStateInterface>,
    private ref: ChangeDetectorRef,
    private scheduleService: ScheduleService
  ) {
    this.store = store;
  }

  ngOnInit() {
    this.intersections$ = this.store.select('intersections');
    this.events$ = this.store.select('events')
      .subscribe((events) => {
        if (events.length) {
          this.doubledEventIndex = -1;
          this.setEventsToDraw(events);
          this.drawEvents(this.events);
        }
      });
    this.isBusy = true;
    this.getDayData();
    this.selectedEventIndex = -1;
  }

  private setEventsToDraw(events) {
    events.forEach((event, i) => {
      if (event.start < COLUMN_HEIGHT && (event.start + event.duration) > COLUMN_HEIGHT) {
        const start = {
          title: event.title,
          start: event.start,
          duration: COLUMN_HEIGHT - event.start
        };
        const end = {
          title: event.title,
          start: COLUMN_HEIGHT,
          duration: event.start + event.duration - COLUMN_HEIGHT
        };
        this.doubledEventIndex = i;
        this.events = events.splice(i, 1, new EventClass(start), new EventClass(end));
        return;
      }
    });
    this.events = events;
  }

  private getDayData() {
     this.scheduleService.getScheduleData()
      .subscribe(() => {
        this.ref.markForCheck();
        this.isBusy = false;
    });
  }

  private drawEvents(events) {
    this.intersections$.dispatch({type: RESET_INTERSECTIONS});
    events.forEach((event) => {
      this.drawEvent(event);
    });
  }

  private drawEvent(event) {
    this.setPositionInSchedule(event);
  }

  private setPositionInSchedule(currentEvent) {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      event.positionY = event.start < COLUMN_HEIGHT ? event.start : event.start - COLUMN_HEIGHT;

      if (currentEvent !== event) {
        if (currentEvent.start <= event.start && event.start < (currentEvent.start + currentEvent.duration)) {
          const intersection = {
            start: event.start,
            end: currentEvent.start + currentEvent.duration
          };
          this.intersections$.dispatch({type: ADD_INTERSECTION, payload: intersection});
          this.calculateConflictingEventXPosition(event, currentEvent);
        }

        if (currentEvent.width === EVENT_COLUMN_WIDTH) {
          this.calculateSingleEventXPosition(currentEvent);
        }
      }
    }
  }

  private calculateConflictingEventXPosition(event, currentEvent) {
    currentEvent.width = EVENT_COLUMN_WIDTH / 2;
    event.width = EVENT_COLUMN_WIDTH / 2;


    if (event.start < COLUMN_HEIGHT) {
      currentEvent.positionX = currentEvent.positionX || FIRST_COLUMN_X;
      event.positionX = currentEvent.positionX === FIRST_COLUMN_X ? currentEvent.positionX + event.width : FIRST_COLUMN_X;
    } else {
      currentEvent.positionX = currentEvent.positionX || SECOND_COLUMN_X;
      event.positionX = currentEvent.positionX === SECOND_COLUMN_X ? currentEvent.positionX + event.width : SECOND_COLUMN_X;
    }
  }

  private calculateSingleEventXPosition(event) {
    event.positionX = event.start < COLUMN_HEIGHT ? FIRST_COLUMN_X : SECOND_COLUMN_X;
  }

  public selectEvent(event, i) {
    if (this.selectedEvent === event) {
      this.selectedEvent = null;
      this.selectedEventIndex = -1;
      return;
    }

    this.selectedEvent = event;
    if (this.doubledEventIndex === -1) {
      this.selectedEventIndex = i;
    } else {
      this.selectedEventIndex = i <= this.doubledEventIndex ? i : i - 1;
    }
  }

  public exportCalendarData() {
    const eventsData = this.events
      .map((event) => {
      return {
        'title': event.title,
        'start': event.start,
        'duration': event.duration
      };
    });

    return JSON.stringify(eventsData);

  }

  public deleteEvent() {
    this.scheduleService.deleteEvent(this.selectedEventIndex);
  }
}
