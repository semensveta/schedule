import {Component, OnInit } from '@angular/core';
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

  public resetForm(form) {
    form.resetForm();
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
          this.resetForm(form);
        },
        (error) => {
          this.errorMessage = error;
        });

  }

}
