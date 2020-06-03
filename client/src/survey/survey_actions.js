export const SET_SURVEY_FORM = 'SET_SURVEY_FORM';
export const setSurveyForm = (key, dataObj) => ({
  type: SET_SURVEY_FORM, key, dataObj
})

export const SET_SURVEY_EXP_DATE = 'SET_SURVEY_EXP_DATE';
export const setSurveyExpDate = date => ({
  type: SET_SURVEY_EXP_DATE, date
})

export const RESET_SURVEY_FORM = 'RESET_SURVEY_FORM';
export const resetSurveyForm = () => ({
  type: RESET_SURVEY_FORM, 
})