/**
 * Created by User on 04.01.2018.
 */
import { EventInterface } from '../interfaces/event-interface';
import { Actions, SET_EVENTS } from '../classes/action-class';



export function eventsReducer(state: EventInterface[] = [], action: Actions) {
  switch (action.type) {
    case SET_EVENTS:
      return  action.payload;

    default:
      return state;
  }
};
