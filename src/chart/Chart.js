import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../reusable/Header'
import VotingSelector from './VotingSelector'
import { Pie } from 'react-chartjs-2'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#26c6da',
  },
  button: {
    marginLeft: 15, 
    width: '7.5rem'
  }
};

const buildChart = data => {
    return {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255,99,132,1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ]
      }]
    };
  }

class Chart extends Component {

  userAlreadyVoted = (users, email) => users.findIndex( user => user.id === email );

  render() {
    const { id, surveys, userData } = this.props;
    const [survey] = [...surveys].filter( survey => survey.id === id);
    let chart = <div/>
    let votingOptions = (
      <Link to={'/dashboard'}>
        <RaisedButton style={styles.button}
        label="Return" secondary={true}/>
      </Link>
    )

    if( survey.users.length === 0 ) {
      votingOptions = <VotingSelector surveyData={survey} />;
    } else if ( survey.users.length > 0 ) {
      const userHasVoted = this.userAlreadyVoted(survey.users, userData.email)
      userHasVoted > -1 ? 
        chart = <Pie data={buildChart(survey.stats)}/> : 
        votingOptions = <VotingSelector surveyData={survey} />
    }

    return(
      <div style={styles.root}>
        <Header />
        <Card className="dashboard-card">
          <CardTitle style={styles.title}
            titleColor="white"
            subtitleColor="white"
            title={survey.name}
            subtitle={survey.description} />
          <CardText>{chart}</CardText>
          <CardActions>{votingOptions}</CardActions>
        </Card>
      </div> 
    )
  }
}

export default Chart;