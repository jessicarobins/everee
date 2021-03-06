import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import GridLayout from '../../../components/GridLayout/GridLayout'

import './Explore.css'

class Explore extends Component {

  handleGoExplore = () => {
    this.props.pushState('/explore')
  }

  render() {
    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: muiTheme.palette.primary2Color,
        padding: '40px 0'
      }
    }

    return (
      <Paper
        zDepth={0}
        style={styles.container}
        className="explore-container">
        <GridLayout
          isOutOfPages={true}
          fetchLists={this.props.fetchLists}
          pushState={this.props.pushState}
          lists={this.props.lists} />
        <RaisedButton
          secondary={true}
          onClick={this.handleGoExplore}
          label='Explore more lists' />
      </Paper>
    )
  }
}

export default muiThemeable()(Explore)