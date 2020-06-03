import axios from 'axios'

export const SET_SURVEYS = 'SET_SURVEYS';
export const setSurveys = surveys => ({
    type: SET_SURVEYS, surveys
})

export const RESET_SURVEYS = 'RESET_SURVEYS';
export const resetSurveys = () => ({
    type: RESET_SURVEYS, reset: null
})

export const DELETE_SURVEY = 'DELETE_SURVEY';
export const deleteSurvey = id => ({
    type: DELETE_SURVEY, id
})

export const handleSurveyDeletion = id => {
    return (dispatch) => {
        axios.delete(`/survey/${id}`, {
        headers: {"x-access-token": sessionStorage.getItem('token')}
        }).then( response => dispatch(deleteSurvey(id)))
    }
}
