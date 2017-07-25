import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import ListTypist from '../../../components/ListTypist/ListTypist'

import './LoginHero.css'

class LoginHero extends Component {

  render() {
    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: muiTheme.palette.primary1Color,
        color: muiTheme.palette.alternateTextColor
      },
      tagline: {
        color: muiTheme.palette.primary2Color
      }
    }

    return (
      <Paper style={styles.container} className="login-hero-container">
        <div className="container">
          <ListTypist
            lists={this.props.lists}
            fetchDemoLists={this.props.fetchDemoLists} />
          <p className="tagline" style={styles.tagline}>
            Keep track of what you want to do &mdash; with help from the rest of the internet.
          </p>
          <RaisedButton
            className="login-button"
            onClick={this.props.auth.login}
            label='Get started'
            secondary={true} />
        </div>
      </Paper>
    )
  }
}

export default muiThemeable()(LoginHero)