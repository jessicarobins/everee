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
      this.props.addListItem({
        id: this.props.list._id,
        text: this.state.text
      })
      this.setState({
        text: ''
      })
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
          value={this.state.text}
          onChange={(event, newValue) => this.setState({text: newValue})}
          hintText="A new item..."
        />
        <FlatButton
          onClick={this.addListItem}
          label="Add item"
          secondary={true} />
      </div>
    )
  }
}

export default CreateListItemForm
