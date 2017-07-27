import React, { Component } from 'react'

import RecentListCard from '../../../components/ListListCard/RecentListCard/RecentListCard'

import './NoLists.css'

class NoLists extends Component {

  render() {
    return (
      <div className="container no-lists-container">
        <h2>You have no lists.</h2>
        <RecentListCard
          pushState={this.props.pushState}
          handleChangeList={this.props.handleChangeList}
          subheaderText='Recently Created Lists'
          fetchLists={this.props.fetchLists}
          lists={this.props.lists} />
      </div>
    )
  }
}

export default NoLists
