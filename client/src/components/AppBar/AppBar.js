import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class EvereeAppBar extends Component {
  render() {

    return (
      <AppBar
        zDepth={0}
        title="everee"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="logout" />}
      />
    )
  }
}

export default EvereeAppBar