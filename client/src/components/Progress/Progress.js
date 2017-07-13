import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

class Progress extends Component {
  render() {

    return (
      <div>
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }
}

export default Progress