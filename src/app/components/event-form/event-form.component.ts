import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventClass } from '../../classes/event-class';
import { ScheduleService } from '../../services/shcedule.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  errorMessage: string;

  @Output()
  public addNewEvent = new EventEmitter();

  private static convertTimeValue(time) {
    const timeArr = time.split(':');
    return timeArr[0] * 60 + Number(timeArr[1]);
  }

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.errorMessage = '';
  }

  public submitForm(form: NgForm) {
    const eventData = {
      'start': EventFormComponent.convertTimeValue(form.value.start) - 480,
      'duration': form.value.duration,
      'title': form.value.title
    };
    const event = new EventClass(eventData);
    this.scheduleService.addEvent(event)
      .subscribe(
        (res) => {
          this.addNewEvent.emit(eventData);
        },
        (error) => {
          this.errorMessage = error;
        });

  }

}
