import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

class UserMenu extends Component {

  loggedIn() {
    const styles = {
      iconButton: {
        display: 'flex',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }

    return (
      <IconMenu
        iconButtonElement={<IconButton style={styles.iconButton}><Avatar src={this.props.user.picture} /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem primaryText="Logout" onClick={this.props.logout} />
      </IconMenu>
    )
  }

  loggedOut() {
    return <RaisedButton
      style={this.props.logoutButtonStyle}
      secondary={true}
      label="login"
      onClick={(creds) => this.props.login(creds)} />
  }

  render() {
    return this.props.user ? this.loggedIn() : this.loggedOut()
  }
}

export default UserMenu

UserMenu.defaultProps = {
  logoutButtonStyle: {
    marginTop: '14px'
  }
}