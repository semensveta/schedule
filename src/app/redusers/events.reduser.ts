/**
 * Created by User on 04.01.2018.
 */
import { EventInterface } from '../interfaces/event-interface';
import { Actions, ADD_EVENT, DELETE_EVENT, SET_EVENTS } from '../classes/action-class';



export function eventsReducer(state: EventInterface[] = [], action: Actions) {
  switch (action.type) {
    case ADD_EVENT:
      return state;

    case DELETE_EVENT:
      return state;

    case SET_EVENTS:
      return state;

    default:
      return state;
  }
};
