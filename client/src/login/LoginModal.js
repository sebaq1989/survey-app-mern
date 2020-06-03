import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const LoginModal = ({ title, isOpen, body, handleToggle, isAuthenticated }) => {
  const actions = isAuthenticated ?
  [
    <Link className="open-search" to={'/dashboard'}>
      <FlatButton
        label={"OK"}
        primary={true}
      />
    </Link>
  ] :
  [
    <FlatButton
      label="OK"
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

export default LoginModal
