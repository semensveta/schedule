import { Component, OnInit, Input } from '@angular/core';
import {EventInterface} from '../../interfaces/event-interface';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {


  @Input()
  public eventData: EventInterface;

  constructor() { }

  ngOnInit() {
  }

}
