import { SET_REGISTER_FORM, RESET_REGISTER_FORM } from './register_actions' // IMPORT THE ACTIONS

export const registerForm = (state = {
  firstName: '', lastName: '', email: '', password: ''
}, action) => {
  switch(action.type){
    case SET_REGISTER_FORM :
      return {...state, [`${action.key}`]: action.formObj[`${action.key}`]}
    case RESET_REGISTER_FORM :
      return Object.assign({}, {}, {
        firstName: '', lastName: '', email: '', password: ''
      });
    default : return state;
  }
}

