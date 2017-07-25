import React, { Component } from 'react'

import Paper from 'material-ui/Paper'

import ListList from '../ListList/ListList'

class ListListCard extends Component {

  render() {
    return (
      <Paper className="list-card">
        <ListList
          avatar={true}
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