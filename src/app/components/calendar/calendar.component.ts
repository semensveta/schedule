import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { EventInterface } from '../../interfaces/event-interface';

import {
  EVENT_COLUMN_WIDTH,
  FIRST_COLUMN_X,
  SECOND_COLUMN_X,
  COLUMN_HEIGH,
} from '../schedule-grid/grid-constants';
import { ScheduleService } from '../../services/shcedule.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  public events;
  public isBusy: boolean;
  public selectedEventIndex: number;
  public selectedEvent: EventInterface;

  constructor(
    private ref: ChangeDetectorRef,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.isBusy = true;
    this.getDayData();
    this.selectedEventIndex = -1;
  }

  private getDayData() {
     this.scheduleService.getScheduleData()
      .subscribe((events) => {
        this.ref.markForCheck();

        console.log(events);
        this.events = events;
        this.drawEvents(events);
        this.isBusy = false;
    });
  }

  private drawEvents(events) {
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
      event.positionY = event.start < COLUMN_HEIGH ? event.start : event.start - COLUMN_HEIGH;

      if (currentEvent.start < event.start && event.start < (currentEvent.start + currentEvent.duration)) {
        this.calculateConflictingEventXPosition(event, currentEvent);
      }

      if (currentEvent.width === EVENT_COLUMN_WIDTH) {
        this.calculateSingleEventXPosition(currentEvent);
      }
    }
  }

  private calculateConflictingEventXPosition(event, currentEvent) {
    currentEvent.width = EVENT_COLUMN_WIDTH / 2;
    event.width = EVENT_COLUMN_WIDTH / 2;

    console.log(event);

    if (event.start < COLUMN_HEIGH) {
      currentEvent.positionX = currentEvent.positionX || FIRST_COLUMN_X;
      event.positionX = currentEvent.positionX === FIRST_COLUMN_X ? currentEvent.positionX + event.width : FIRST_COLUMN_X;
    } else {
      currentEvent.positionX = currentEvent.positionX || SECOND_COLUMN_X;
      event.positionX = currentEvent.positionX === SECOND_COLUMN_X ? currentEvent.positionX + event.width : SECOND_COLUMN_X;
    }
  }

  private calculateSingleEventXPosition(event) {
    console.log(SECOND_COLUMN_X);
    event.positionX = event.start < COLUMN_HEIGH ? FIRST_COLUMN_X : SECOND_COLUMN_X;
  }

  public selectEvent(event, i) {
    if (this.selectedEvent === event) {
      this.selectedEvent = null;
      this.selectedEventIndex = -1;
      return;
    }
    this.selectedEvent = event;
    this.selectedEventIndex = i;
  }

  public addEvent(event) {
    this.isBusy = true;

    this.scheduleService.addEvent(event)
      .subscribe((events) => {
        this.ref.markForCheck();

        this.events = events;
        this.drawEvents(events);
        this.isBusy = false;
      });
  }

  public deleteEvent() {
    this.scheduleService.deleteEvent(this.selectedEventIndex);
    this.getDayData();
  }
}
