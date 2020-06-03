import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ActionButton from './ActionButton';

const styles = {
  title: {
    backgroundColor: '#26c6da',
  },
  stats: {
    display: 'flex', 
    flexWrap: 'wrap',
  }, 
  chip: {
    margin: 4,
  }, 
  button: {
    marginLeft: 15, 
    width: '7.5rem'
  }
};

class SurveyItem extends Component {

  printSurveyStats = statsObj => {
    let SurveyItems = [];
    for ( let key in statsObj ) {
      SurveyItems.push(
        <Chip key={key} style={styles.chip}>
          {`${key} ${statsObj[key]}`}
        </Chip>
      )
    }
    return SurveyItems;
  }
  
  userAlreadyVoted = (users, email) => {
    return users.findIndex( user => user.id === email );
  }

  render() {
    const { survey, isAdmin, userData } = this.props;
    const { id, name, description, stats, length, users } = survey;

    let statsItems = this.printSurveyStats(stats);
    let linkToChart = (
      <Link to={`/chart/${id}`}>
        <RaisedButton style={styles.button}
        label="Details" secondary={true}/>
      </Link>
     )

    if( !userData.isAdmin && 
      this.userAlreadyVoted(users, userData.email) === -1 ) {
      linkToChart = <div/>
    }

    return(
      <Card className="dashboard-card">
        <CardTitle style={styles.title}
          titleColor="white"
          subtitleColor="white"
          title={name} 
          subtitle={description} />
        <CardText>
          <div style={styles.stats}>{statsItems}</div>
        </CardText>
        <CardActions style={styles.stats}>
          {linkToChart}
          <ActionButton 
            surveyStats={stats} 
            numberOfVotes={length} 
            voters={users}
            isAdmin={isAdmin}
            surveyId={id}
          />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ userData })
export default connect(mapStateToProps, null)(SurveyItem)
