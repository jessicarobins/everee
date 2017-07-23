import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class EvereeAppBar extends Component {

  iconElementRight = () => {
    const { auth } = this.props

    if (auth.isAuthenticated()) {
      return <FlatButton label="logout" onClick={this.props.auth.logout} />
    }

    return <FlatButton label="login" onClick={this.props.auth.login} />
  }

  render() {

    return (
      <AppBar
        style={this.props.appBarStyle}
        zDepth={this.props.zDepth}
        title="everee"
        showMenuIconButton={false}
        iconElementRight={this.iconElementRight()}
      />
    )
  }
}

EvereeAppBar.defaultProps = {
  zDepth: 0
}

export default EvereeAppBar