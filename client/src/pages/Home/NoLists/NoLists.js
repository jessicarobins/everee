import React, { Component } from 'react'

import GridLayout from '../../../components/GridLayout/GridLayout'

import RaisedButton from 'material-ui/RaisedButton'

import './NoLists.css'

class NoLists extends Component {

  handleGoExplore = () => {
    this.props.pushState('/explore')
  }

  render() {
    return (
      <div className="container no-lists-container">
        <h2>Need some inspiration?</h2>
        <GridLayout
          isOutOfPages={true}
          fetchLists={this.props.fetchLists}
          pushState={this.props.pushState}
          lists={this.props.lists} />
        <RaisedButton
          secondary={true}
          onClick={this.handleGoExplore}
          label='Explore more lists' />
      </div>
    )
  }
}

export default NoLists
