import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class ListDetails extends Component {

  render() {

    return (
      <Paper>
        <h1>I want to {this.props.list.name}</h1>
      </Paper>
    )
  }
}

export default ListDetails