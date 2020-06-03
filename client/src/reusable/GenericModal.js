import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

class GenericModal extends Component {

  componentWillUnmount(){
    this.props.resetGenericModal()
  }

  render() {
    const { title, isOpen, body, modalBtn, 
      handleToggle, shouldLink, link } = this.props;
      const actions = shouldLink ?
      [
        <Link to={link}>
          <FlatButton
            label={modalBtn || "OK"}
            primary={true}
          />
        </Link>
      ] :
      [
        <FlatButton
          label={modalBtn || "OK"}
          primary={true}
          onClick={ () => handleToggle(!isOpen) }
        />
      ] 
    return (
      <Dialog
        title={title}
        actions={actions}
        modal={true}
        open={isOpen}>{body}
      </Dialog>
    )
  }
}

export default connect(null, actions)(GenericModal)