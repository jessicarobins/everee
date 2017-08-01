import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import UserMenu from '../UserMenu/UserMenu'

import logo from '../../assets/everee2.svg'

class EvereeAppBar extends Component {

  constructor(props) {
    super(props)
    props.doAuthentication()
  }

  iconElementRight = () => {
    if (this.props.authenticated) {
      return (
        <UserMenu
          picture={this.props.user.picture}
          logout={this.props.logout} />
      )
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