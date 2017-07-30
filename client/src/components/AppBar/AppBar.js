import React, { Component } from 'react'

import { isAuthenticated } from '../../services/Auth'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import './AppBar.css'
import logo from '../../assets/everee2.svg'

class EvereeAppBar extends Component {

  constructor(props) {
    super(props)
    props.doAuthentication()
  }

  iconElementRight = () => {
    const { auth } = this.props

    if (isAuthenticated()) {
      return <FlatButton label="logout" onClick={this.props.logout} />
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
        iconElementLeft={<img src={logo} alt="logo" className="logo" />}
        iconElementRight={this.iconElementRight()}
      />
    )
  }
}

EvereeAppBar.defaultProps = {
  zDepth: 0
}

export default EvereeAppBar