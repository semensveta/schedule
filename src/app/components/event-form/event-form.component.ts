import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Output()
  public addNewEvent = new EventEmitter();

  private static convertTimeValue(time) {
    let timeArr = time.split(':');
    return timeArr[0]*60 + Number(timeArr[1]);
  }

  constructor() { }

  ngOnInit() {
  }

  public submitForm(form: NgForm) {
    let eventData = {
      'start': EventFormComponent.convertTimeValue(form.value.start) - 480,
      'duration': EventFormComponent.convertTimeValue(form.value.duration),
      'title': form.value.title
    };
    this.addNewEvent.emit(eventData);
  }

}
