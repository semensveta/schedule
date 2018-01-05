/**
 * Created by User on 04.01.2018.
 */
import { Action } from '@ngrx/store';
import {EventInterface} from '../interfaces/event-interface';
import {IntersectionInterface} from '../interfaces/intersection-interface';
export const RESET_INTERSECTIONS = 'RESET_INTERSECTIONS';
export const SET_EVENTS = 'SET_EVENTS';
export const ADD_INTERSECTION = 'ADD_INTERSECTION';

class AddIntersection implements Action {
  readonly type = ADD_INTERSECTION;

  constructor(public payload: IntersectionInterface) {}
}

class SetActions implements Action {
  readonly type = SET_EVENTS;

  constructor(public payload: EventInterface[]) {}
}

class ResetIntersections implements Action {
  readonly type = RESET_INTERSECTIONS;

  constructor() {}
}

 export type Actions =
 | AddIntersection
 | SetActions
 | ResetIntersections;
