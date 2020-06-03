// ACTIONS & CREATORS FOR REGISTER FORM
export const SET_REGISTER_FORM = 'SET_REGISTER_FORM';
export const setRegisterForm = (key, formObj) => ({
  type: SET_REGISTER_FORM, key, formObj
})

export const RESET_REGISTER_FORM = 'RESET_REGISTER_FORM';
export const resetRegisterForm = () => ({
  type: RESET_REGISTER_FORM
})
