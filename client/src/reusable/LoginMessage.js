import React from 'react'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '12%'
  },
  title: {
    backgroundColor: '#26c6da',
  },
  button: {
    marginLeft: 15, 
    width: '7.5rem'
  }
};

const LoginMessage = () => (
  <div style={styles.root}>
    <Card className="dashboard-card">
      <CardTitle style={styles.title}
        titleColor="white"
        subtitleColor="white"
        title="Login Error" 
        subtitle="" />
      <CardText>
        <h3>You must be logged in to view the survey you want to see. Please return to the login page.</h3>
      </CardText>
      <CardActions>
        <Link to={'/'}>
          <RaisedButton style={styles.button}
          label="Login" secondary={true}/>
        </Link>
      </CardActions>
    </Card>
  </div>
)

export default LoginMessage;