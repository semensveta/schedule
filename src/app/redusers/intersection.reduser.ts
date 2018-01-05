/**
 * Created by User on 04.01.2018.
 */
import {IntersectionInterface } from '../interfaces/intersection-interface';
import { Actions, ADD_INTERSECTION, RESET_INTERSECTIONS } from '../classes/action-class';


export function intersectionsReducer(state: IntersectionInterface[] = [], action: Actions) {
  switch (action.type) {
    case ADD_INTERSECTION:
      return  [...state, action.payload];

    case RESET_INTERSECTIONS:
      return  [];

    default:
      return state;
  }
};
