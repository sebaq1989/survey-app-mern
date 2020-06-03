import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
require('flexboxgrid')

const styles = {
  form: {
    marginTop: '7%'
  }, 
  inputs: {
    paddingTop: '1.5rem', paddingBottom: '1.5rem'
  }, 
  registerBtn: {
    width: '8rem', 
    margin: '5px'
  }, 
  btnPadding: {
    paddingBottom: '1rem'
  }
}

const RegisterForm = ({ registerFormData, handleTextInput, handleSave }) => {

    const { firstName, lastName, email, password } = registerFormData
    return (
      <div className="row center-xs" style={styles.form}>
        <div className="col-xs-12 col-sm-6">
          <Card>
            <AppBar
              title={<span className="form-title">Register Now Below</span>}
              showMenuIconButton={false}
            />
            <div style={styles.inputs}>
              <TextField 
                type="text"
                value={firstName}
                errorText={ firstName.length === 0 ? "This field is required" : "" }
                onChange={handleTextInput}
                id="firstName" name="firstName" 
                hintText="First Name"
                floatingLabelText="Enter First Name"
              /><br />
              <TextField 
                type="text"
                value={lastName}
                errorText={ lastName.length === 0 ? "This field is required" : "" }
                onChange={handleTextInput}
                id="lastName" name="lastName"
                hintText="Last Name"
                floatingLabelText="Enter Last Name"
              /><br />
              <TextField 
                type="text"
                value={email}
                errorText={email.length === 0 ? "This field is required" : "" }
                onChange={handleTextInput}
                id="email" name="email"
                hintText="Email"
                floatingLabelText="Enter Email"
              /><br />
              <TextField
                type="text"
                value={password}
                errorText={ password.length === 0 ? "This field is required" : "" }
                onChange={handleTextInput}
                id="password" name="password"
                hintText="Password" 
                floatingLabelText="Enter Password"
              />
            </div>
            <div style={styles.btnPadding}>
              <Link to={'/'}><RaisedButton label="Return" secondary={true} style={styles.registerBtn}/></Link>
              <RaisedButton disabled={ firstName.length === 0 || lastName.length === 0 || 
                email.length === 0 || password.length === 0 ? true : false } 
                onClick={handleSave} label="Save" secondary={true} style={styles.registerBtn}/>
            </div>
          </Card>
        </div>
      </div>
    )
}

export default RegisterForm
