import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

import UserMenu from '../UserMenu/UserMenu'

import logo from '../../assets/logo-light.svg'

class EvereeAppBar extends Component {

  render() {
    const image =
      <IconButton style={{padding: '0'}} onClick={this.props.goHome}>
        <img
          src={logo}
          alt="logo"
          className="small-logo" />
      </IconButton>

    return (
      <AppBar
        className="app-bar"
        style={this.props.appBarStyle}
        zDepth={this.props.zDepth}
        iconElementLeft={image}
        iconElementRight={<UserMenu
          authenticated={this.props.authenticated}
          user={this.props.user}
          login={this.props.login}
          logout={this.props.logout} />}
      />
    )
  }
}

EvereeAppBar.defaultProps = {
  zDepth: 0
}

export default EvereeAppBar