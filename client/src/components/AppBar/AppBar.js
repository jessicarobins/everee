import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'

import UserMenu from '../UserMenu/UserMenu'

import logo from '../../assets/logo-light.svg'

class EvereeAppBar extends Component {

  render() {
    const styles = {
      titleStyle: {
        fontFamily: "'Cantora One', sans-serif"
      }
    }

    return (
      <AppBar
        titleStyle={styles.titleStyle}
        className="app-bar"
        style={this.props.appBarStyle}
        zDepth={this.props.zDepth}
        title="everee"
        iconElementLeft={<img src={logo} alt="logo" className="small-logo" />}
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