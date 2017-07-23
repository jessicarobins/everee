import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import muiThemeable from 'material-ui/styles/muiThemeable'

import './Progress.css'

class Progress extends Component {

  render() {
    const styles = {
      color: this.props.muiTheme.palette.accent1Color
    }
    return (
      this.props.displayed ?
        <div className="progress-container">
          <CircularProgress size={80} thickness={5} color={styles.color} />
        </div> : null
    )
  }
}

export default muiThemeable()(Progress)