import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'

import UserMenu from '../UserMenu/UserMenu'

import logo from '../../assets/everee2.svg'

class EvereeAppBar extends Component {

  constructor(props) {
    super(props)
    props.doAuthentication()
  }

  iconElementRight = () => {
    return (
      <UserMenu
        user={this.props.user}
        login={this.props.login}
        logout={this.props.logout} />
    )
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