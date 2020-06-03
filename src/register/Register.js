import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './register_actions'
import axios from 'axios'
import RegisterForm from './RegisterForm'
import RegisterModal from './RegisterModal'

class Register extends Component {

  state = {
    isOpen: false,
    modalTitle: null,
    modalBody: null, 
    modalButton: null, 
    shouldLinkToHomepage: true
  }

  componentWillUnmount = () => {
    this.props.resetRegisterForm();
  }

  handleTextInput = event => {
    this.props.setRegisterForm(event.target.id, { [`${event.target.id}`]: event.target.value });
    this.isValid(this.props.registerForm);
  }

  isValid = ({ firstName, lastName, email, password }) => {
    if( firstName.length === 0 || lastName.length === 0 || 
      email.length === 0 || password.length === 0 ) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }
  
  handleSave = () => {
// NOTES : data passed in request needs to be formatted like this : 
// {name: "Jerry Berry", email: "JB123@gmail.com", password: "jearbear"}
    const { firstName, lastName, email, password } = {...this.props.registerForm};
    const postBody = { name: `${firstName} ${lastName}`, email, password };
    axios.post('/user', postBody)
    .then( response => {
      if(response.data.success){
        this.setState({ 
          isOpen: !this.state.isOpen,
          modalTitle: "Success",
          modalBody: response.data.message,
          modalButton: "Login", 
          shouldLinkToHomepage: true
        });
      } else if (!response.data.success){
        this.setState({ 
          isOpen: !this.state.isOpen,
          modalTitle: "Error",
          modalBody: response.data.message, 
          modalButton: "OK", 
          shouldLinkToHomepage: false
        });
      }
      this.props.resetRegisterForm();
    })
    .catch( response => {
      if(!response.data.success){
        this.setState({ 
          isOpen: !this.state.isOpen,
          modalTitle: "Error",
          modalBody: "We were unable to register the user. Please try again.",
          modalButton: "OK", 
          shouldLinkToHomepage: false
        });
        this.props.resetRegisterForm();
      }
    });
  }

  render() {
    return (
    <div>
      <RegisterForm 
        registerFormData={ this.props.registerForm }
        handleTextInput={ this.handleTextInput }
        handleSave={ this.handleSave }
      />
      <RegisterModal
        title={this.state.modalTitle}
        isOpen={this.state.isOpen}
        body={this.state.modalBody}
        handleToggle={this.toggleModal}
        shouldLinkToHomepage={this.state.shouldLinkToHomepage}
        modalBtn={this.state.modalButton}
      />
    </div>
    )
  }
}

const mapStateToProps = ({ registerForm }) => ({ registerForm })
export default connect(mapStateToProps, actions)(Register)

