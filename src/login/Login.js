import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './login_actions'
import axios from 'axios'

import LoginForm from './LoginForm'
import LoginModal from './LoginModal'

class Login extends Component {

  state = {
    isOpen: false,
    modalTitle: null,
    modalBody: null,
  }

  componentWillMount = () => {
    this.props.resetUserData();
  }

  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen });
  };

  handleTextInput = event => {
    this.props.setLoginForm(event.target.id, { [`${event.target.id}`]: event.target.value });
  }

  handleLogin = () => {
    const { email, password } = {...this.props.loginForm};
    const postBody = { email, password };

    axios.post('/user/authenticate', postBody)
    .then( response => {
      if(!response.data.success){
        this.setState({ 
          isOpen: !this.state.isOpen,
          modalTitle: "Error",
          modalBody: response.data.message
        });
        this.props.resetLoginForm();
      } else if (response.data.success) {
        this.props.setUserData({
          isAuthenticated: true, 
          username: response.data.name,
          isAdmin: response.data.admin, 
          email: response.data.email
        })
        this.setState({ 
          isOpen: !this.state.isOpen,
          modalTitle: "Success",
          modalBody: response.data.message, 
        });
        sessionStorage.setItem('token', response.data.token)
        this.props.resetLoginForm();
      }
    })
    .catch( response => {
      this.setState({ 
        isAuthenticated: false,
        isOpen: !this.state.isOpen,
        modalTitle: "Error",
        modalBody: "We were unable to authenticate those credentials. Please try again."
      });
      this.props.resetLoginForm();
    });
  }

  render() {
    const { email, password } = this.props.loginForm; 
    const { isAuthenticated } = this.props.userData; 
    return (
      <div>
        <LoginForm email={email} password={password} 
          handleTextInput={this.handleTextInput} handleLogin={this.handleLogin} />
        <LoginModal
          title={this.state.modalTitle}
          isOpen={this.state.isOpen}
          body={this.state.modalBody}
          handleToggle={this.toggleModal}
          isAuthenticated={isAuthenticated}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ loginForm, userData }) => ({ loginForm, userData })
export default connect(mapStateToProps,actions)(Login)
