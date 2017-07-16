import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class EvereeAppBar extends Component {
  render() {

    return (
      <AppBar
        zDepth={this.props.zDepth}
        title="everee"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="logout" onClick={this.props.logout} />}
      />
    )
  }
}

EvereeAppBar.defaultProps = {
  zDepth: 0
}

export default EvereeAppBar