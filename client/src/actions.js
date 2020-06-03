export const SET_GENERIC_MODAL = 'SET_GENERIC_MODAL';
export const setGenericModal = genericModalData => ({
  type: SET_GENERIC_MODAL, genericModalData
})

export const RESET_GENERIC_MODAL = 'RESET_GENERIC_MODAL';
export const resetGenericModal = () => ({
  type: RESET_GENERIC_MODAL,
})

export const TOGGLE_GENERIC_MODAL = 'TOGGLE_GENERIC_MODAL';
export const toggleGenericModal = modalFlag => ({
  type: TOGGLE_GENERIC_MODAL, modalFlag
})