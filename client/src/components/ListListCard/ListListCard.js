import React, { Component } from 'react'

import Paper from 'material-ui/Paper'

import ListList from '../ListList/ListList'

import '../ListCard/ListCard.css'

class ListListCard extends Component {

  render() {
    return (
      <Paper className={`list-card ${this.props.className}`}>
        <ListList
          avatar={(list) => list._users[0].picture}
          max={5}
          subheaderText={this.props.subheaderText}
          getLists={this.props.fetchLists}
          handleChangeList={this.props.handleChangeList}
          lists={this.props.lists} />
        {this.props.button}
      </Paper>
    )
  }
}

export default ListListCard