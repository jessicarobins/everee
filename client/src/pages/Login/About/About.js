import React, { Component } from 'react'

import {grey200} from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'

import './About.css'

class About extends Component {

  render() {
    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: grey200,
        color: muiTheme.palette.primary2Color
      },
      description: {
        color: muiTheme.palette.shadowColor
      }
    }

    return (
      <Paper
        zDepth={0}
        style={styles.container}
        className="about-container">
        <div className="container">
          <div className="cta">
            everee is a crowd-sourced bucket list for completionists
          </div>
          <p className="description" style={styles.description}>
            Ever wanted to keep track of your progress towards categorically
            completing a task? Trying every flavor of Oreo, for example.
            everee generates the list of items for you based on lists made
            by other users, and keeps your list in sync, so that it stays
            up-to-date when another flavor of Oreo comes out.
          </p>
        </div>
      </Paper>
    )
  }
}

export default muiThemeable()(About)