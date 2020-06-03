import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import GenericModal from '../reusable/GenericModal'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

const styles = {
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 0 1rem 1rem'
  },
  radioButton: {
    display: 'inline-block', 
    width: 'auto',
  },
  button: {
    marginLeft: 17, 
    width: '7.5rem'
  }
};

class VotingSelector extends Component {

  state = {
    btnChoice: null, 
    isOptionSelected: false
  }

  handleBtnChoice = topic => {
    this.setState({
      btnChoice: topic, 
      isOptionSelected: true
    })
  }

  incrementSurveyScore = (id, topic) => {
    // route : rootUrl/survey/vote/:id >> body : { "topic": "Bengal" }  
    return axios({
      method: 'post',
      url: `https://mern-survey-app.herokuapp.com/survey/increment/${id}`,
      headers: {"x-access-token": sessionStorage.getItem('token')},
      data: { "topic": topic }
    })
  }
   
  addUserToSurvey = (id, email) => {
    // route : rootUrl/survey/vote/:id >> body : { "id": USER_ID }
    return axios({
      method: 'post',
      url: `https://mern-survey-app.herokuapp.com/survey/vote/${id}`,
      headers: {"x-access-token": sessionStorage.getItem('token')},
      data: { "id": email }
    })
  }

  handleVoteSubmission = (id, email, topic) => {
    axios.all([this.incrementSurveyScore(id, topic), this.addUserToSurvey(id, email)])
    .then(axios.spread( (scoreInc, addUser) => {
      this.props.setGenericModal({ 
        isOpen: !this.props.genericModal.isOpen,
        modalTitle: "Success",
        modalBody: "Congrats. Your vote has been added",
        modalButton: "OK", 
        shouldLink: true,
        link: '/dashboard'
      });
    }))
    .catch( response => {
      if(Error){ // this works!
        this.props.setGenericModal({ 
          isOpen: !this.props.genericModal.isOpen,
          modalTitle: "Error",
          modalBody: "We were unable to save your vote. Please try again.",
          modalButton: "OK", 
          shouldLink: false
        });
      }
    });
  }

  printButtonOptions = statsArr => {
    return statsArr.map( (topic, index) => {
      return (
        <RadioButton
          style={styles.radioButton}
          key={index}
          value={topic}
          label={topic}
          onClick={() => this.handleBtnChoice(topic)}
        />
      )
    })
  }

  toggleModal = flag => {
    this.props.toggleGenericModal(flag);
  }

  render() {
    const { modalTitle, isOpen, modalBody, 
      modalButton, shouldLink, link } = this.props.genericModal
    const { id, stats } = this.props.surveyData;
    const radioButtons = this.printButtonOptions( Object.keys(stats) );
    return (
      <div>
        <RadioButtonGroup style={styles.buttonGroup}
          name="shipSpeed" defaultSelected="not_light">
          {radioButtons}
        </RadioButtonGroup>
        <Link to={'/dashboard'}>
          <RaisedButton style={styles.button}
          label="Return" secondary={true}/>
        </Link>
        <RaisedButton style={styles.button}
          disabled={ !this.state.isOptionSelected ? true: false }
          label="Cast Vote" secondary={true} 
          onClick={ () => this.handleVoteSubmission(id, this.props.userData.email, this.state.btnChoice) }
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
    )
  }
}

const mapStateToProps = ({ userData, genericModal }) => ({ userData, genericModal });
export default connect(mapStateToProps, actions)(VotingSelector);