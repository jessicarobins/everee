import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import './CreateListItemForm.css'

class CreateListItemForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  addListItem = () => {
    if (this.state.text.length) {
      // this.props.addList({
      //   verb: this.state.verb,
      //   action: this.state.action
      // })
    }
    else {
      this.props.addMessage('All fields are required.')
    }
  }

  render() {

    return (
      <div className="create-list-item-form">
        <TextField
          fullWidth={true}
          onChange={(event, newValue) => this.setState({text: newValue})}
          hintText="A new item..."
        />
        <FlatButton label="Add item" secondary={true} />
      </div>
    )
  }
}

export default CreateListItemForm
