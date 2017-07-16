import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

class SystemMessage extends Component {

  handleRequestClose = () => {
    this.props.addMessage('')
  }

  render() {
    return (
      <Snackbar
        open={!!this.props.message.length}
        message={this.props.message}
        autoHideDuration={4000}
        action="okay"
        onActionTouchTap={this.handleRequestClose}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}

export default SystemMessage