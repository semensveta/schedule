import {EventInterface} from '../interfaces/event-interface';

export class EventClass implements EventInterface {
  positionX: number;
  positionY: number;
  duration: number;
  width: number;
  title: string;
  start: number;

  constructor(event) {
    this.start = event.start;
    this.positionX = event.positionX;
    this.positionY = event.positionY;
    this.duration = event.duration;
    this.width = event.width ? event.width : 200;
    this.title = event.title;
  }
}
