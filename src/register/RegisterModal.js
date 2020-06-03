import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

const RegisterModal = ({ title, isOpen, body, modalBtn, 
  handleToggle, shouldLinkToHomepage }) => {
  const actions = shouldLinkToHomepage ?
  [
    <Link to={'/'}>
      <FlatButton
        label={modalBtn || "Login"}
        primary={true}
      />
    </Link>
  ] :
  [
    <FlatButton
      label={modalBtn || "Login"}
      primary={true}
      onClick={ () => handleToggle({ isOpen: !isOpen }) }
    />
  ] 
  return(
    <Dialog
      title={title}
      actions={actions}
      modal={true}
      open={isOpen}>{body}
    </Dialog>
  )
}

export default RegisterModal
