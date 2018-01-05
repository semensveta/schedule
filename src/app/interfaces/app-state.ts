import { EventInterface } from './event-interface';
import {IntersectionInterface} from './intersection-interface';

export interface AppStateInterface {
  events: Array<EventInterface>;
  intersections: Array<IntersectionInterface>;
}
