import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'material-ui/svg-icons/av/playlist-add'

import './CreateListItemForm.css'

class CreateListItemForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  addListItem = (e) => {
    e.preventDefault()

    if (this.state.text.length) {
      this.props.addListItem({
        id: this.props.list._id,
        text: this.state.text
      })
      this.setState({
        text: ''
      })
    }
    else {
      this.input.focus()
      this.props.addMessage('All fields are required.')
    }
  }

  render() {

    return (
      <form
        onSubmit={this.addListItem}
        className="create-list-item-form">
        <TextField
          ref={(input) => {this.input = input}}
          fullWidth={true}
          value={this.state.text}
          onChange={(event, newValue) => this.setState({text: newValue})}
          hintText="A new item..."
        />
        <RaisedButton
          icon={<AddIcon />}
          labelPosition="before"
          onClick={this.addListItem}
          label="Add item"
          secondary={true} />
      </form>
    )
  }
}

export default CreateListItemForm
