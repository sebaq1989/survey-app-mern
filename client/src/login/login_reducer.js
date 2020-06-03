import { SET_LOGIN_FORM, RESET_LOGIN_FORM, 
  SET_USER_DATA, RESET_USER_DATA } from './login_actions'

export const loginForm = (state = {
    email: '', password: ''
  }, action) => {
  switch(action.type){
    case SET_LOGIN_FORM :
      return {...state, [`${action.key}`]: action.formObj[`${action.key}`]}
    case RESET_LOGIN_FORM :
      return Object.assign({}, {}, { email: '', password: '' });
    default : return state;
  }
}

export const userData = (state = {
  isAuthenticated: false, 
  username: null,
  isAdmin: false, 
  email: ''
}, action) => {
  switch(action.type){
    case SET_USER_DATA :
      return Object.assign({}, state, action.userData)
    case RESET_USER_DATA : 
      return Object.assign({}, {}, {
        isAuthenticated: false, 
        username: null,
        isAdmin: false, 
        email: ''
      });
    default:
      return state;
  }
}