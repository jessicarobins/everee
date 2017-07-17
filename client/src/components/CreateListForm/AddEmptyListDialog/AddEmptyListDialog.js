import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class AddEmptyListDialog extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.handleClose}
      />,
      <RaisedButton
        label="Create an empty list!"
        secondary={true}
        onTouchTap={this.props.addEmptyList}
      />
    ]

    return (
      <Dialog
        title="No lists found"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}>
        No existing lists found for <strong>{this.props.action}</strong>.
        Create an empty list?
      </Dialog>
    )
  }
}

export default AddEmptyListDialog