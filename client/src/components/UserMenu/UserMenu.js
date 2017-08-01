import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

class UserMenu extends Component {

  render() {
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
        iconButtonElement={<IconButton style={styles.iconButton}><Avatar src={this.props.picture} /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem primaryText="Logout" onClick={this.props.logout} />
      </IconMenu>
    )
  }
}

export default UserMenu