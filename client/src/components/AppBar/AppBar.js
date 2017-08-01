import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import logo from '../../assets/everee2.svg'

class EvereeAppBar extends Component {

  constructor(props) {
    super(props)
    props.doAuthentication()
  }

  userMenu = () => {
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

  iconElementRight = () => {
    if (this.props.authenticated) {
      return this.userMenu()
    }

    return <FlatButton label="login" onClick={(creds) => this.props.login(creds)} />
  }

  render() {

    return (
      <AppBar
        className="app-bar"
        style={this.props.appBarStyle}
        zDepth={this.props.zDepth}
        title="everee"
        iconElementLeft={<img src={logo} alt="logo" className="small-logo" />}
        iconElementRight={this.iconElementRight()}
      />
    )
  }
}

EvereeAppBar.defaultProps = {
  zDepth: 0
}

export default EvereeAppBar