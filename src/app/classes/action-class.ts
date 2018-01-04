/**
 * Created by User on 04.01.2018.
 */
import { Action } from '@ngrx/store';
import {EventInterface} from '../interfaces/event-interface';
export const ADD_EVENT = 'ADD';
export const DELETE_EVENT = 'DELETE';
export const SET_EVENTS = 'SET';

class AddEventAction implements Action {
  readonly type = ADD_EVENT;

  constructor(public payload: EventInterface) {}
}

class SetAction implements Action {
  readonly type = SET_EVENTS;

  constructor(public payload: EventInterface[]) {}
}

class DeleteAction implements Action {
readonly type = DELETE_EVENT;

  constructor(public payload: number) {}
}
 export type Actions =
 | AddEventAction
 | SetAction
 | DeleteAction;
