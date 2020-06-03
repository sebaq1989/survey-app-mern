import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as surveyActions from './survey_actions'
import * as rootActions from '../actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import SurveyForm from './SurveyForm'
import LoginMessage from '../reusable/LoginMessage'
import GenericModal from '../reusable/GenericModal'

export class Survey extends Component {

  toggleModal = flag => {
    this.props.rootActions.toggleGenericModal(flag);
  }

  handleTextField = event => {
    this.props.surveyActions.setSurveyForm(event.target.id, { [`${event.target.id}`]: event.target.value})
  }

  handleDatePicker = (event, date) => { // params are required
    this.props.surveyActions.setSurveyExpDate(date)
  }

  handleSave = () => {
    const { name, description, surveyItem1, surveyItem2, surveyItem3, 
      surveyItem4, surveyItem5, expiration } = {...this.props.surveyForm};
    const itemsArr = [ surveyItem1, surveyItem2, surveyItem3, 
      surveyItem4, surveyItem5 ];
    const stats = itemsArr.reduce( (obj, val) => {
      if( val.length > 0 ) { obj[val] = 0 }
      return obj;
    }, {})
    const postBody = { name, description, stats, expiration }

    axios({
      method: 'post',
      url: 'survey/create',
      headers: {"x-access-token": sessionStorage.getItem('token')},
      data: postBody
    })
    .then( response => {
      if(response.data.survey){
        this.props.rootActions.setGenericModal({ 
          isOpen: !this.props.genericModal.isOpen,
          modalTitle: "Success",
          modalBody: response.data.message,
          modalButton: "OK", 
          shouldLink: true,
          link: '/dashboard'
        });
      } else {
        this.props.rootActions.setGenericModal({ 
          isOpen: !this.props.genericModal.isOpen,
          modalTitle: "Error",
          modalBody: response.data.message, 
          modalButton: "OK", 
          shouldLink: false
        });
      }
      this.props.surveyActions.resetSurveyForm();
    })
    .catch( response => {
      if(Error){ // this works!
        this.props.rootActions.setGenericModal({ 
          isOpen: !this.props.genericModal.isOpen,
          modalTitle: "Error",
          modalBody: "We were unable to save the survey. Please try again.",
          modalButton: "OK", 
          shouldLink: false
        });
        this.props.surveyActions.resetSurveyForm();
      }
    });
  }

  render() {
    const { modalTitle, isOpen, modalBody, 
        modalButton, shouldLink, link } = this.props.genericModal
    return (
      this.props.userData.isAdmin ? ( 
        <div>
          <SurveyForm 
            surveyFormData={ this.props.surveyForm }
            handleTextInput={ this.handleTextField }
            handleDateInput={ this.handleDatePicker }
            handleSave={ this.handleSave }
          />
          <GenericModal
            title={modalTitle}
            isOpen={isOpen}
            body={modalBody}
            handleToggle={this.toggleModal}
            shouldLink={shouldLink}
            modalBtn={modalButton}
            link={link}
          />
        </div>
      ) : (
        <div><LoginMessage /></div>
      )
    )
  }
}

const mapStateToProps = ({ surveyForm, genericModal, userData }) => ({ surveyForm, genericModal, userData })
const mapDispatchToProps = dispatch => ({
  surveyActions: bindActionCreators(surveyActions, dispatch),
  rootActions: bindActionCreators(rootActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
