import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import LinkIcon from 'material-ui/svg-icons/content/link'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class AddLinkButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      url: ''
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({
      open: false,
      url: ''
    })
  }

  handleAddLink = () => {
    this.props.addListLink({
      id: this.props.list._id,
      url: this.state.url
    })
    this.handleClose()
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleAddLink()
    }
  }

  updateUrl = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        onClick={this.handleAddLink}
      />
    ]

    return (
      <div>
        <FlatButton
          onClick={this.handleOpen}
          icon={<LinkIcon />}
          label="Add Link"
          labelPosition="before"
          secondary={true} />
        <Dialog
          title="Add a link"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextField
            autoFocus
            value={this.state.url}
            onKeyPress={this.onKeyPress}
            onChange={this.updateUrl}
            type='url'
            fullWidth={true}
            floatingLabelText="URL"/>
        </Dialog>
      </div>
    )
  }
}

export default AddLinkButton