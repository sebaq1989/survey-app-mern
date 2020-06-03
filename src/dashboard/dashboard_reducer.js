import { SET_SURVEYS, RESET_SURVEYS, DELETE_SURVEY } from './dashboard_actions'

export const surveys = (state = null, action) => {
  switch(action.type) {
    case SET_SURVEYS : 
      return action.surveys;
    case RESET_SURVEYS : 
      return action.reset;
    case DELETE_SURVEY :
      return [...state].filter( survey => survey.id !== action.id )
    default :
      return state;
  }
}