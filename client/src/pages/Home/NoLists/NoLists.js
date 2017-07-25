import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import ListListCard from '../../../components/ListListCard/ListListCard'

import './NoLists.css'

class NoLists extends Component {

  handleButtonClick = () => {
    this.props.pushState('/explore')
  }

  renderButton = () => {
    return (
      <RaisedButton
        onClick={this.handleButtonClick}
        fullWidth={true}
        label='Explore More'
        secondary={true} />
    )
  }

  render() {
    return (
      <div className="container no-lists-container">
        <h2>You have no lists.</h2>
        <ListListCard
          handleChangeList={this.props.handleChangeList}
          subheaderText='Recently Created Lists'
          fetchLists={this.props.fetchLists}
          lists={this.props.lists}
          button={this.renderButton()}/>
      </div>
    )
  }
}

export default NoLists
