import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './dashboard_actions'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  button: {
    marginLeft: 15, 
    width: '7.5rem'
  }
};

export class ActionButton extends Component {

  userAlreadyVoted = (users, email) => users.filter( user => user.id === email )

  render() {
    let button = '';
    const { numberOfVotes, voters, isAdmin, surveyId } = this.props;
    if( isAdmin && numberOfVotes === 0 ) { 
      button = <RaisedButton style={styles.button}
      label="Delete" onClick={() => this.props.handleSurveyDeletion(surveyId)} secondary={true}/>
    } else if ( !isAdmin ) {
      const [userHasVoted] = this.userAlreadyVoted(voters, this.props.userData.email)
      if( !userHasVoted ) {
        button = ( 
          <Link to={`/chart/${surveyId}`}>
            <RaisedButton style={styles.button}
            label="Vote" secondary={true}/>
          </Link> )
      }
    }
    return (
      <div>{button}</div>
    )
  }
}

const mapStateToProps = ({ userData }) => ({ userData })
export default connect(mapStateToProps, actions)(ActionButton)
