import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../dashboard/dashboard_actions'
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/action/input';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class Header extends Component {
  render(){
    return (
      <AppBar className='dashboard-header'
        title={  
          <span style={styles.title}>{this.props.userData.username || ''}</span>
        }
        onTitleTouchTap={handleTouchTap}
        iconElementLeft={<Link to={'/'}>
          <IconButton onClick={this.props.resetSurveys}><NavigationClose color="white" /></IconButton></Link>}
        iconElementRight={ this.props.userData.isAdmin ? <Link to={'/survey'}>
          <FlatButton style={{ color: '#fff'}} label="Create Survey" /></Link> : <div></div>}
      />
    );
  }
 }

const mapStateToProps = ({ userData }) => ({ userData })
export default connect(mapStateToProps, actions)(Header)
