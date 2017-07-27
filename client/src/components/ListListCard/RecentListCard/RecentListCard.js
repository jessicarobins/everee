import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import ListListCard from '../ListListCard'

class RecentListCard extends Component {

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
      <ListListCard
        handleChangeList={this.props.handleChangeList}
        subheaderText='Recently Created Lists'
        fetchLists={this.props.fetchLists}
        lists={this.props.lists}
        button={this.renderButton()}/>
    )
  }
}

export default RecentListCard
