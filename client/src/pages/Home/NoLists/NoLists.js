import React, { Component } from 'react'

import ListListCard from '../../../components/ListListCard/ListListCard'

import './NoLists.css'

class NoLists extends Component {

  render() {
    return (
      <div className="container no-lists-container">
        <h2>You have no lists.</h2>
        <ListListCard
          handleChangeList={this.props.handleChangeList}
          subheaderText='Recently Created Lists'
          fetchLists={this.props.fetchLists}
          pushState={this.props.pushState}
          lists={this.props.lists} />
      </div>
    )
  }
}

export default NoLists
