// IMPORT COMBINEREDUCERS FROM REDUX 
import { combineReducers } from 'redux';
import { registerForm } from './register/register_reducer'
import { loginForm, userData } from './login/login_reducer'
import { surveys } from './dashboard/dashboard_reducer'
import { surveyForm } from './survey/survey_reducer'

// shared reuasble actions
import { SET_GENERIC_MODAL, RESET_GENERIC_MODAL, TOGGLE_GENERIC_MODAL 
  } from './actions.js'

// shared reusable reducer
  export const genericModal = ( state = { 
    isOpen: false, modalTitle: '', modalBody: '', 
      modalButton: '', shouldLink: false, link: ''
  }, action ) => {
    switch(action.type) {
      case SET_GENERIC_MODAL : 
        return action.genericModalData
      case RESET_GENERIC_MODAL : 
        return { ...state, isOpen: false, modalTitle: '', modalBody: '', 
        modalButton: '', shouldLink: false, link: '' }
      case TOGGLE_GENERIC_MODAL : 
        return { ...state, isOpen: action.modalFlag}
      default :
        return state;
    }
  }

 export default combineReducers({ registerForm, loginForm, userData, 
    surveys, surveyForm, genericModal });

