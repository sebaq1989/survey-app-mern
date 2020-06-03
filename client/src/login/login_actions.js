// ACTIONS & CREATORS FOR LOGIN FORM
export const SET_LOGIN_FORM = 'SET_LOGIN_FORM';
export const setLoginForm = (key, formObj) => ({
  type: SET_LOGIN_FORM, key, formObj
});

export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM';
export const resetLoginForm = () => ({
  type: RESET_LOGIN_FORM,
})

export const SET_USER_DATA = 'SET_USER_DATA';
export const setUserData = userData => ({
    type: SET_USER_DATA, userData
})

export const RESET_USER_DATA = 'RESET_USER_DATA';
export const resetUserData = () => ({
  type: RESET_USER_DATA,
})