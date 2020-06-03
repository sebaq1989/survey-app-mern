import React from 'react'
import Spinner from '../reusable/Spinner'
import SurveyItem from './SurveyItem'

const styles = {
  root: { 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center' 
  }
}

const printSurveys = (arr, isAdmin) => {
  return arr.map( (survey, index) => {
    return (
      <SurveyItem key={index} survey={survey} isAdmin={isAdmin} />
    )
  })
}

const SurveyList = ({ surveys, isAdmin }) => {
  const surveyData = Array.isArray(surveys) ? printSurveys(surveys, isAdmin): <Spinner />;
  return (
    <div style={styles.root}>{surveyData}</div>
  )
}

export default SurveyList
